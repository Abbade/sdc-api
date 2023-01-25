import { ActionPlants, Actions, FasesCultivo, Locations } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { TIPO_FASE_CULTIVO } from "../../../../constants/TIPO_FASE_CULTIVO";
import { ACTION_TYPE } from "../../../../constants/ACTION_TYPE";

const postmanJson = {
  transplantDate: "2012-04-30T18:25:43.511Z",
  plants: [1, 2, 3, 4],
  id_recipiente: 1,
  id_location: 1,
  id_faseCultivo: 2,

  obs: "Ae",
};

interface ITransplantPlants {
  id_user_create: number;
  transplantDate: Date;
  actionPlants: number[];
  actionLote: number;
  actionCrop: number;
  plants: number[];

  id_recipiente: number;
  id_location: number;
  id_faseCultivo: number;

  scheduled: boolean;
  obs: string;
  id_user_completion: number;
  id_action: number;
  id_action_type: number;
}

interface ITransplantUpdate { }

function finishTasks(id_user_completion: number, completionDate: Date, actionPlants?: number[], actionCrop?: number, actionLote?: number) {

  if (actionPlants) {
    const updatedActionPlants = prisma.actionPlants.updateMany({
      where: {
        id: {
          in: actionPlants
        }
      },
      data: {
        id_user_completion: id_user_completion,
        completionDate: completionDate,
        isCompleted: true,
        status: "Concluída",
      }
    })
  }

  if (actionLote) {
    const updatedActionLote = prisma.actionLotes.updateMany({
      where: {
        id: {
          in: actionLote
        }
      },
      data: {
        id_user_completion: id_user_completion,
        completionDate: completionDate,
        isCompleted: true,
        status: "Concluída",
      }
    })
  }

  if (actionCrop) {
    const updatedActionCrop = prisma.actionCrops.updateMany({
      where: {
        id: {
          in: actionCrop
        }
      },
      data: {
        id_user_completion: id_user_completion,
        completionDate: completionDate,
        isCompleted: true,
        status: "Concluída",
      }
    })
  }

}

export class TransplantPlantsUseCase {
  async execute({
    transplantDate,
    actionPlants,
    plants,
    id_recipiente,
    id_location,
    id_faseCultivo,
    id_user_create,
    obs,
    id_user_completion,
    scheduled,
    id_action,
    id_action_type,
    actionCrop,
    actionLote
  }: ITransplantPlants) {
    // (1,2,now(),'Atividades de transplante.','TRANSPLANTE'),
    // (2,2,now(),'Alteração de fase de cultivo','ALTERA_FASE_CULTIVO'),
    // (3,2,now(),'Descartes Planta','DESCARTE_PLANTA'),
    //   (4,2,now(),'Descartes Muda ','DESCARTE_MUDA'),
    // (5,2,now(),'Alteração de local','ALTERA_LOCAL'),
    //   (6,2,now(),'Criação de Planta','CREATE_PLANTA'),
    //   (7,2,now(),'Criação de Muda','CREATE_MUDA'),
    //   (8,2,now(),'Matriz','MATRIZ'),
    //   (9,2,now(),'Colheita de Plantas','COLHEITA');

    //   (10,2,now(),'Finalização de Colheita','FINISH_CROP');

    const selectedActionLote = await prisma.actionLotes.findFirst({
      where: {
        id: { in: actionLote }
      },
      include: {
        lote: true
      }
    })

    const selectedActionPlants = await prisma.actionPlants.findMany({
      where: {
        id: { in: actionPlants }
      },
      include: {
        planta: true
      }
    })

    const selectedActionCrop = await prisma.actionCrops.findFirst({
      where: {
        id: { in: actionCrop }
      },
      include: {
        crop: true
      }
    })

    const selectedPlants = selectedActionPlants.map(actionPlant => {
      return actionPlant.planta
    })

    const selectedLote = selectedActionLote?.lote
    const selectedCrop = selectedActionCrop?.crop



    const newLocation = selectedActionPlants[0]?.id_location
    const newRecipiente = selectedActionPlants[0]?.id_recipiente
    const newFaseCultivo = selectedActionPlants[0]?.id_faseCultivo




    switch (id_action_type) {

      case 1:
        //TRANSPLANTE
        if (newRecipiente) {
          const updatedPlants = prisma.plantas.updateMany({
            where: {
              id: { in: plants }
            },
            data: {
              id_recipiente: newRecipiente
            }
          })

          finishTasks(id_user_completion, transplantDate, actionPlants)
        }

        break;

      case 2:
        //ALTERA_FASE_CULTIVO
        if (newFaseCultivo) {
          const updatedPlants = prisma.plantas.updateMany({
            where: {
              id: { in: plants }
            },
            data: {
              id_faseCultivo: newFaseCultivo
            }
          })

          finishTasks(id_user_completion, transplantDate, actionPlants)

        }
        break;

      case 5:
        //ALTERA_LOCAL
        if (newLocation) {
          const updatedPlants = prisma.plantas.updateMany({
            where: {
              id: { in: plants }
            },
            data: {
              id_location: newLocation
            }
          })

          finishTasks(id_user_completion, transplantDate, actionPlants)

        }
        break;


      default:
        break;
    }







    let selectedFaseCultivoChangeAction: Actions | undefined | null;
    let selectedLocationChangeAction: Actions | undefined | null;
    let selectedFaseCultivo: FasesCultivo | null | undefined;
    let selectedLocation: Locations | null | undefined;

    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente,
      },
    });

    if (!selectedRecipiente) {
      throw new Error("Recipiente não existente: " + id_recipiente);
    }

    if (id_location) {
      const selectedLocation = await prisma.locations.findFirst({
        where: {
          id: id_location,
        },
      });

      if (!selectedLocation) {
        throw new Error("Localização não existente: " + id_location);
      }
    }

    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants },
      },
      include: {
        faseCultivo: true,
      },
    });

    plantsToUpdate.map((plant) => {
      if (plant.trashDate) {
        throw new Error("Não é possivel transplantar plantas descartadas.");
      }

      if (plant.cropDate) {
        throw new Error("Não é possivel transplantar plantas colhidas.");
      }

      if (plant.id_recipiente == selectedRecipiente.id) {
        throw new Error(
          "Não é possivel transplantar planta para um mesmo recipiente."
        );
      }

      if (plant.lastTransplant && plant.lastTransplant > transplantDate) {
        throw new Error(
          "Não é possivel transplantar plantas em uma data anterior a ultimo transplante."
        );
      }

      if (plant.faseCultivo.ordem > id_faseCultivo) {
        throw new Error(
          "Não é possivel voltar com plantas para fase anterior."
        );
      }
    });

    let actions = [] as ActionPlants[];

    const newActionGroup = await (
      await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs,
        },
      })
    ).id;

    const selectedRecipientChangeAction = await prisma.actions.create({
      data: {
        id_user_create: id_user_create,
        isLote: false,
        isPlant: false,
        isCrop: false,
        name: "Alteração de recipiente",
        id_actionType: ACTION_TYPE.TRANSPLANTE,
        created_at: new Date(),
        scheduledDate: scheduled ? transplantDate : undefined,

        isCompleted: scheduled ? false : true,
        completionDate: scheduled ? undefined : transplantDate,
        id_user_completion: scheduled ? undefined : id_user_completion,

        id_user_atribution: id_user_completion ? id_user_completion : id_user_create,
        qtd: plantsToUpdate.length,
      },
    });



    if (id_location) {
      selectedLocationChangeAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Mover plantas",
          id_actionType: ACTION_TYPE.ALTERA_LOCAL,
          created_at: new Date(),
          scheduledDate: scheduled ? transplantDate : undefined,

          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,
          id_user_completion: scheduled ? undefined : id_user_completion,

          id_user_atribution: id_user_completion ? id_user_completion : id_user_create,
          qtd: plantsToUpdate.length,
        },
      });
    }

    if (id_faseCultivo) {
      selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
        where: {
          id: id_faseCultivo,
        },
      });

      if (!selectedFaseCultivo) {
        throw new Error("Fase de cultivo não existente: " + id_faseCultivo);
      }

      selectedFaseCultivoChangeAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Alteração de fase",
          id_actionType: ACTION_TYPE.ALTERA_FASE_CULTIVO,
          created_at: new Date(),
          scheduledDate: scheduled ? transplantDate : undefined,

          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,
          id_user_completion: scheduled ? undefined : id_user_completion,

          id_user_atribution: id_user_completion ? id_user_completion : id_user_create,
          qtd: plantsToUpdate.length,
        },
      });
    }
    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?

    plantsToUpdate.forEach((plant) => {
      const newActionParams = {
        id_planta: plant.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: scheduled ? "Agendada" : "Completed",
        isCompleted: scheduled ? false : true,
        completionDate: scheduled ? undefined : transplantDate,
        id_user_completion: scheduled ? undefined : id_user_completion,

        id_user_atribution: id_user_completion ? id_user_completion : id_user_create,
        id_action: selectedRecipientChangeAction.id,
        scheduledDate: scheduled ? transplantDate : undefined,

        id_recipiente: id_recipiente,

        id_recipiente_old: id_recipiente ? plant.id_recipiente : undefined,
      } as ActionPlants;
      actions.push(newActionParams);

      if (selectedLocationChangeAction) {
        const newActionLocationParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,
          id_user_completion: scheduled ? undefined : id_user_completion,
          scheduledDate: scheduled ? transplantDate : undefined,

          id_user_atribution: id_user_completion ? id_user_completion : id_user_create,
          id_action: selectedLocationChangeAction?.id,

          id_location: id_location,

          id_location_old: id_location ? plant.id_location : undefined,
        } as ActionPlants;
        actions.push(newActionLocationParams);
      }
      console.log(selectedFaseCultivoChangeAction);
      if (selectedFaseCultivoChangeAction) {
        const newActionChangeStageParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,
          id_user_completion: scheduled ? undefined : id_user_completion,

          id_user_atribution: id_user_completion ? id_user_completion : id_user_create,
          id_action: selectedFaseCultivoChangeAction?.id,
          scheduledDate: scheduled ? transplantDate : undefined,

          id_faseCultivo: id_faseCultivo,

          id_faseCultivo_old: id_faseCultivo ? plant.id_faseCultivo : undefined,
        } as ActionPlants;
        actions.push(newActionChangeStageParams);
      }
    });

    let updatePlantsParams = {
      where: {
        id: { in: plants },
      },
      data: {
        id_recipiente: id_recipiente,
      },
    } as any;

    if (id_location) updatePlantsParams.data.id_location = id_location;
    if (id_faseCultivo) updatePlantsParams.data.id_faseCultivo = id_faseCultivo;
    if (
      selectedFaseCultivo?.id_tipo_fase_cultivo == TIPO_FASE_CULTIVO.VEGETACAO
    )
      updatePlantsParams.data.vegetationDate = transplantDate;
    if (selectedFaseCultivo?.id_tipo_fase_cultivo == TIPO_FASE_CULTIVO.FLORACAO)
      updatePlantsParams.data.floweringDate = transplantDate;
    if (!scheduled) {
      const updatedPlants = await prisma.plantas.updateMany(updatePlantsParams);
    }
    const createActionPlants = await prisma.actionPlants.createMany({
      data: actions,
    });
    return actions;
  }
}
