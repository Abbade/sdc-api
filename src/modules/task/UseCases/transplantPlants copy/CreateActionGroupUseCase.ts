import { ActionPlants, Actions, FasesCultivo, Locations, Plantas } from "@prisma/client";
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
  actionDate: Date;
  startDate: Date;
  endDate: Date;
  plants: number[];

  id_recipiente: number;
  id_location: number;
  id_faseCultivo: number;

  id_user_atribution: number;
  scheduled: boolean;
  obs: string;
  name: string;
}

interface ITransplantUpdate { }

export async function changeRecipientePlantas(id_recipiente: number, plantsId: number[], commonActionData: any, commonActionPlantsData: any) {
  await validateRecipiente(id_recipiente)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedRecipienteChangeAction = await createRecipientChangeAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedRecipienteChangeAction, plantsToUpdate, commonActionPlantsData, id_recipiente);
  await createActionPlants(newActionPlants);
  await updatePlantsRecipient(plantsId, id_recipiente);
}

async function changeLocationPlantas(id_location: number, plantsId: number[], commonActionData: any, commonActionPlantsData: any) {
  await validateLocation(id_location)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedLocationChangeAction = await createLocationChangeAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedLocationChangeAction, plantsToUpdate, commonActionPlantsData, id_location);
  await createActionPlants(newActionPlants);
  await updatePlantsRecipient(plantsId, id_location);
}

async function changeFaseCultivoPlantas(id_faseCultivo: number, plantsId: number[], commonActionData: any, commonActionPlantsData: any) {
  await validateFaseCultivo(id_faseCultivo)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedFaseCultivoChangeAction = await createFaseCultivoChangeAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedFaseCultivoChangeAction, plantsToUpdate, commonActionPlantsData, id_faseCultivo);
  await createActionPlants(newActionPlants);
  await updatePlantsRecipient(plantsId, id_faseCultivo);
}

async function trashPlantas(id_trashReason: number, plantsId: number[], commonActionData: any, commonActionPlantsData: any) {
  await validateTrashReason(id_trashReason)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedTrashPlantaAction = await createTrashPlantAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedTrashPlantaAction, plantsToUpdate, commonActionPlantsData, id_trashReason);
  await createActionPlants(newActionPlants);
  await updatePlantsTrashed(plantsId, commonActionPlantsData.completionDate);
}


async function validateTrashReason(id_trashReason: number): Promise<void> {
    const selectedTrashReason = await prisma.trashReasons.findFirst({
      where: {
        id: id_trashReason,
      },
    });

    if (!selectedTrashReason) {
      throw new Error("Motivo de descarte não existente: " + id_trashReason);
    }
}

async function validateRecipiente(id_recipiente: number): Promise<void> {
    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente,
      },
    });

    if (!selectedRecipiente) {
      throw new Error("Recipiente não existente: " + id_recipiente);
    }
}

async function validateFaseCultivo(id_faseCultivo: number): Promise<void> {
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        id: id_faseCultivo,
      },
    });

    if (!selectedFaseCultivo) {
      throw new Error("Fase de cultivo não existente: " + id_faseCultivo);
    }
}

async function validateLocation(id_location: number): Promise<void> {
    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location,
      },
    });

    if (!selectedLocation) {
      throw new Error("Localização não existente: " + id_location);
    }
}

function validatePlants(plants: Plantas[]): void {

  for (const plant of plants) {
    if (plant.trashDate) {
      throw new Error("Não é possivel transplantar plantas descartadas.");
    }

    if (plant.cropDate) {
      throw new Error("Não é possivel transplantar plantas colhidas.");
    }
  }
}

async function getPlantsById(ids: number[]): Promise<Plantas[]> {
  const plantsToUpdate = await prisma.plantas.findMany({
    where: {
      id: { in: ids },
    }
  });

  validatePlants(plantsToUpdate)

  return plantsToUpdate

}

async function createTrashPlantAction(commonActionData: any) {
  return await prisma.actions.create({
    data: {
      ...commonActionData,
      isLote: false,
      isPlant: true,
      isCrop: false,
      name: "Descarte de Planta",
      id_actionType: ACTION_TYPE.DESCARTE_PLANTA,
    },
  });
}

async function createRecipientChangeAction(commonActionData: any) {
  return await prisma.actions.create({
    data: {
      ...commonActionData,
      isLote: false,
      isPlant: true,
      isCrop: false,
      name: "Alteração de recipiente",
      id_actionType: ACTION_TYPE.TRANSPLANTE,
    },
  });
}

async function createLocationChangeAction(commonActionData: any) {
  return await prisma.actions.create({
    data: {
      ...commonActionData,
      isLote: false,
      isPlant: true,
      isCrop: false,
      name: "Alteração de local",
      id_actionType: ACTION_TYPE.ALTERA_LOCAL,
    },
  });
}

async function createFaseCultivoChangeAction(commonActionData: any) {
  return await prisma.actions.create({
    data: {
      ...commonActionData,
      isLote: false,
      isPlant: true,
      isCrop: false,
      name: "Alteração de fase de cultivo",
      id_actionType: ACTION_TYPE.ALTERA_FASE_CULTIVO,
    },
  });
}


function createActionPlantsData(action: Actions, plantsToUpdate: Plantas[], commonActionPlantsData: any, changeId: number) {
  return plantsToUpdate.map(plant => {
    const plantData: ActionPlants = {
      ...commonActionPlantsData,
      id_planta: plant.id,
      id_action: action.id,
    };

    if (action.id_actionType === ACTION_TYPE.TRANSPLANTE) {
      plantData.id_recipiente = changeId;
      plantData.id_recipiente_old = plant.id_recipiente;
    }
    if (action.id_actionType === ACTION_TYPE.ALTERA_LOCAL) {
      plantData.id_location = changeId;
      plantData.id_location_old = plant.id_location;
    }
    if (action.id_actionType === ACTION_TYPE.ALTERA_FASE_CULTIVO) {
      plantData.id_faseCultivo = changeId;
      plantData.id_faseCultivo_old = plant.id_faseCultivo;
    }
    if (action.id_actionType === ACTION_TYPE.DESCARTE_PLANTA) {
      plantData.id_trashReason = changeId;
    }

    return plantData;
  });
}

async function createActionPlants(newActionPlants: ActionPlants[]) {
  return await prisma.actionPlants.createMany({
    data: newActionPlants,
  });
}

async function updatePlantsRecipient(plantsId: number[], id_recipiente: number) {
  const updatePlantsParams = {
    where: {
      id: { in: plantsId },
    },
    data: {
      id_recipiente: id_recipiente,
    },
  } as any;
  return await prisma.plantas.updateMany(updatePlantsParams);
}

async function updatePlantsLocation(plantsId: number[], id_location: number) {
  const updatePlantsParams = {
    where: {
      id: { in: plantsId },
    },
    data: {
      id_location: id_location,
    },
  } as any;
  return await prisma.plantas.updateMany(updatePlantsParams);
}

async function updatePlantsFaseCultivo(plantsId: number[], id_faseCultivo: number) {
  const updatePlantsParams = {
    where: {
      id: { in: plantsId },
    },
    data: {
      id_faseCultivo: id_faseCultivo,
    },
  } as any;
  return await prisma.plantas.updateMany(updatePlantsParams);
}

async function updatePlantsTrashed(plantsId: number[], actionDate: Date) {
  const updatePlantsParams = {
    where: {
      id: { in: plantsId },
    },
    data: {
      trashDate: actionDate,
    },
  } as any;
  return await prisma.plantas.updateMany(updatePlantsParams);
}




export class CreateActionGroupUseCase {
  async execute({
    actionDate,
    plants,
    id_recipiente,
    id_location,
    id_faseCultivo,
    id_user_create,
    obs,
    name,
    id_user_atribution,
    startDate,
    endDate,
    scheduled
  }: ITransplantPlants) {



    const newActionGroup = await (
      await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs,
          startDate: startDate,
          endDate: endDate,
          name: name

        },
      })
    ).id;

    const commonActionData = {
      id_user_create,
      id_actionGroup: newActionGroup,
      obs,
      created_at: new Date(),
      qtd: plants.length,
      scheduledDate: scheduled ? actionDate : undefined,
      startDate: startDate,
      endDate: endDate,
      isCompleted: scheduled ? false : true,
      completionDate: scheduled ? undefined : actionDate,
      id_user_completion: scheduled ? undefined : id_user_atribution,
      id_user_atribution: id_user_atribution || id_user_create,
    };

    const commonActionPlantsData = {
      id_user_create: commonActionData.id_user_create,
      obs: commonActionData.obs,
      id_actionGroup: commonActionData.id_actionGroup,


      isCompleted: commonActionData.isCompleted,
      completionDate: commonActionData.completionDate,
      id_user_completion: commonActionData.id_user_completion,
      id_user_atribution: commonActionData.id_user_atribution,
      scheduledDate: commonActionData.scheduledDate,
    };


    let actionPlants = [] as ActionPlants[];

    changeRecipientePlantas(id_recipiente, plants, commonActionData, commonActionPlantsData)
  }
}
