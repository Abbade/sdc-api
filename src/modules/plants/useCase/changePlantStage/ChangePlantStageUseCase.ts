import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { ACTION_TYPE } from "../../../../constants/ACTION_TYPE";
import { TIPO_FASE_CULTIVO } from "../../../../constants/TIPO_FASE_CULTIVO";

const postmanJson = {
  transplantDate: "2012-04-30T18:25:43.511Z",
  plants: [1, 2, 3, 4],
  id_recipiente: 1,
  id_location: 1,
  id_faseCultivo: 2,

  obs: "Ae",
};

interface IChangePlantStage {
  id_user_create: number;
  actionDate: Date;
  plants: number[];

  id_faseCultivo: number;

  obs: string;
}

export class ChangePlantStageUseCase {
  async execute({
    actionDate,
    plants,
    id_faseCultivo,
    id_user_create,
    obs,
  }: IChangePlantStage) {
    //VALIDA EXISTENCIA DE CAMPOS

    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        id: id_faseCultivo,
      },
    });

    if (!selectedFaseCultivo) {
      throw new Error("Fase de cultivo não existente: " + id_faseCultivo);
    }

    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants },
      },
    });
    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {
      if (plant.id_faseCultivo === id_faseCultivo) {
        throw new Error("Planta já está na fase de cultivo selecionada.");
      }

      if (plant.isTrashed) {
        throw new Error("Não é possivel alterar plantas descartadas.");
      }

      if (plant.isCropped) {
        throw new Error("Não é possivel alterar plantas colhidas.");
      }
    });

    if (
      selectedFaseCultivo.id_tipo_fase_cultivo == TIPO_FASE_CULTIVO.VEGETACAO
    ) {
      const updatePlantsParams = {
        where: {
          id: { in: plants },
        },
        data: {
          id_faseCultivo: id_faseCultivo,
          vegetationDate: actionDate,
        },
      };
      const updatedDatePlants = await prisma.plantas.updateMany(
        updatePlantsParams
      );
    }

    if (
      selectedFaseCultivo.id_tipo_fase_cultivo == TIPO_FASE_CULTIVO.FLORACAO
    ) {
      const updatePlantsParams = {
        where: {
          id: { in: plants },
        },
        data: {
          id_faseCultivo: id_faseCultivo,
          floweringDate: actionDate,
        },
      };
      const updatedDatePlants = await prisma.plantas.updateMany(
        updatePlantsParams
      );
    }

    let actions = [] as any;

    const newActionGroup = await (
      await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs,
        },
      })
    ).id;

    const selectedAction = await prisma.actions.create({
      data: {
        id_user_create: id_user_create,
        isLote: false,
        isPlant: true,
        isCrop: false,
        name: "Alteração fase de cultivo",
        id_actionType: ACTION_TYPE.ALTERA_FASE_CULTIVO,
        created_at: new Date(),
        qtd: plantsToUpdate.length,
      },
    });

    plantsToUpdate.forEach((plant) => {
      const newActionParams = {
        id_planta: plant.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,
        id_action: selectedAction.id,
        status: "Completed",
        isCompleted: true,
        completionDate: actionDate,

        id_user_atribution: id_user_create,

        id_faseCultivo: id_faseCultivo,

        id_faseCultivo_old: id_faseCultivo ? plant.id_faseCultivo : undefined,
      };
      actions.push(newActionParams);
    });
    const createActionPlants = await prisma.actionPlants.createMany({
      data: actions,
    });
    return actions;
  }
}
