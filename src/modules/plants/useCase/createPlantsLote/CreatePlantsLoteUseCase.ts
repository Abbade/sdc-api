import { prisma } from "../../../../database/prismaClient";

interface ITrashLote {
  id_lote: number;
  aclimatationDate: Date;
  qtPlant: number;
  id_location: number;
  id_recipiente: number;
  obs: string;
  id_user_create: number;
}

interface INewPlant {
  id_lote: number;
  name: string;
  obs: string;
  id_location?: number;
  id_recipiente?: number;
  aclimatationDate: Date;

  //GENERATED ABOVE
  aclimatationName: string;

  id_user_create: number;
  propDate: Date;
  propName: string;
  id_genetic: number;
  id_propagationType: number;

  id_faseCultivo: number;
}

export class CreatePlantsLoteUseCase {
  async execute({
    id_lote,
    aclimatationDate,
    qtPlant,
    id_location,
    id_recipiente,
    obs,
    id_user_create,
  }: ITrashLote) {
    if (qtPlant < 0) {
      throw new Error("Quantidade não deve ser negativa: " + qtPlant);
    }

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        ordem: 2,
      },
    });

    if (!selectedFaseCultivo) {
      throw new Error("Fase de cultivo não existente: " + 2);
    }

    const selectedLote = await prisma.lotes.findFirst({
      where: {
        id: id_lote,
      },
    });

    if (!selectedLote) {
      throw new Error("Lote não existente: " + id_lote);
    }

    const selectedGenetic = await prisma.genetics.findFirst({
      where: {
        id: selectedLote.id_genetic,
      },
    });

    if (!selectedGenetic) {
      throw new Error("Genética não existente: " + selectedLote.id);
    }

    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location,
      },
    });

    if (!selectedLocation) {
      throw new Error("Local não existente: " + selectedLote.id);
    }

    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente,
      },
    });

    if (!selectedRecipiente) {
      throw new Error("Recipiente não existente: " + selectedLote.id);
    }

    //VALIDA QUANTIDADE DE ESTACAS/SEEDLINGS
    if (selectedLote?.qtProp - qtPlant < 0) {
      throw new Error(
        "Lote não tem estacas suficiente para transplante.: " +
        selectedLote.qtProp
      );
    }

    let newPlants = [] as any[];

    const plantIndex = selectedLote.qtPlant + 1;

    for (let i = selectedLote.qtPlant + 1; i < plantIndex + qtPlant; i++) {
      newPlants.push({
        name: selectedLote.name + "#" + i,
        id_user_create: id_user_create,
        obs: obs,


        id_lote: id_lote,

        id_location: id_location,
        id_recipiente: id_recipiente,

        aclimatationDate: aclimatationDate,
        aclimatationRecipient: selectedRecipiente.name,
        aclimatationLocation: selectedLocation.name,
        lastTransplant: aclimatationDate,

        propDate: selectedLote.propDate,
        propName: selectedLote.name,
        id_genetic: selectedLote.id_genetic,
        id_propagationType: selectedLote.id_propagationType,

        id_faseCultivo: selectedFaseCultivo.id,

        //id_mother: selectedLote.id_mother
      });
    }

    const lote = await prisma.lotes.update({
      where: {
        id: id_lote,
      },
      data: {
        qtProp: selectedLote.qtProp - qtPlant,
        qtPlant: selectedLote.qtPlant + qtPlant,
      },
    });

    const plantsCount = await prisma.plantas.createMany({ data: newPlants });
    const plantNames = newPlants.map((plant) => {
      return plant.name;
    });

    const createdPlants = await prisma.plantas.findMany({
      where: {
        name: {
          in: plantNames,
        },
      },
    });

    let actions = [] as any;

    const newActionGroup = await (
      await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs,
        },
      })
    ).id;

    const selectedAction = await prisma.actions.findFirst({
      where: {
        name: "Transplante de planta",
      },
    });

    if (!selectedAction) {
      throw new Error("Action para log não existente: ");
    }

    const selectedLocationChangeAction = await prisma.actions.findFirst({
      where: {
        name: "Mover plantas"
      }
    })



    if (!selectedLocationChangeAction) {
      throw new Error('Action para log não existente: ' );
    }

    const selectedFaseCultivoChangeAction = await prisma.actions.findFirst({
      where: {
        name: "Vegetar planta"
      }
    })
    if (!selectedFaseCultivoChangeAction) {
      throw new Error('Action para log não existente: Vegetar planta');
    }

    createdPlants.forEach((plant) => {

      const newActionParams = {
        id_planta: plant.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        completionDate: aclimatationDate,

        id_user_atribution: id_user_create,
        id_action: selectedAction.id,

        id_recipiente: id_recipiente,
      };
      actions.push(newActionParams);

      const newActionLocationParams = {
        id_planta: plant.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        completionDate: aclimatationDate,

        id_user_atribution: id_user_create,
        id_action: selectedLocationChangeAction?.id,

        id_location: id_location,

        id_location_old: id_location ? selectedLote.id_location_init : undefined
      }
      actions.push(newActionLocationParams)


      const newActionChangeStageParams = {
        id_planta: plant.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        completionDate: aclimatationDate,

        id_user_atribution: id_user_create,
        id_action: selectedFaseCultivoChangeAction?.id,

        id_faseCultivo: plant.id_faseCultivo,

        id_faseCultivo_old: 1,
      }
      actions.push(newActionChangeStageParams)

    });
    const createActionPlants = await prisma.actionPlants.createMany({
      data: actions,
    });

    const selectedActionLote = await prisma.actions.findFirst({
      where: {
        name: "Transplante de mudas",
      },
    });

    if (!selectedActionLote) {
      throw new Error('Action para log não existente: ');
    }



    const actionLote = await prisma.actionLotes.create({
      data: {
        id_lote: selectedLote.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        completionDate: aclimatationDate,

        id_user_atribution: id_user_create,
        id_action: selectedActionLote.id,

        id_location: id_location,
        qt: qtPlant
      }
    })


    return plantsCount;
  }
}
