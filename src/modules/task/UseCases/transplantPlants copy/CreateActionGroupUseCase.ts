import { ActionCrops, ActionPlants, Actions, Crops, FasesCultivo, Locations, Plantas } from "@prisma/client";
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
  plants: number[]
  completed: boolean;

  createdActions: {
    id_actionType: number;
    plants?: number[];
    lotes?: number[];
    crops?: number[];
    completed: boolean;
    startDate: Date;
    endDate: Date;
    obs: string;
    id_user_atribution: number;

    //params
    id_genetic: number
    id_recipiente: number
    id_faseCultivo: number
    id_location: number
    id_trashReason: number

  }[]

  id_recipiente: number;
  id_location: number;
  id_faseCultivo: number;

  id_user_atribution: number;
  scheduled: boolean;
  obs: string;
  name: string;
}

interface ITransplantUpdate { }

export async function changeRecipientePlantas(id_recipiente: number, plantsId: number[], commonActionData: any) {
  await validateRecipiente(id_recipiente)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedRecipienteChangeAction = await createRecipientChangeAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedRecipienteChangeAction, plantsToUpdate, commonActionData, id_recipiente);
  await createActionPlants(newActionPlants);
  await updatePlantsRecipient(plantsId, id_recipiente);
}

async function changeLocationPlantas(id_location: number, plantsId: number[], commonActionData: any) {
  await validateLocation(id_location)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedLocationChangeAction = await createLocationChangeAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedLocationChangeAction, plantsToUpdate, commonActionData, id_location);
  await createActionPlants(newActionPlants);
  await updatePlantsRecipient(plantsId, id_location);
}

async function changeFaseCultivoPlantas(id_faseCultivo: number, plantsId: number[], commonActionData: any) {
  await validateFaseCultivo(id_faseCultivo)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedFaseCultivoChangeAction = await createFaseCultivoChangeAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedFaseCultivoChangeAction, plantsToUpdate, commonActionData, id_faseCultivo);
  await createActionPlants(newActionPlants);
  await updatePlantsRecipient(plantsId, id_faseCultivo);
}

async function trashPlantas(id_trashReason: number, plantsId: number[], commonActionData: any) {
  await validateTrashReason(id_trashReason)
  const plantsToUpdate = await getPlantsById(plantsId)
  const selectedTrashPlantaAction = await createTrashPlantAction(commonActionData);
  const newActionPlants = createActionPlantsData(selectedTrashPlantaAction, plantsToUpdate, commonActionData, id_trashReason);
  await createActionPlants(newActionPlants);
  await updatePlantsTrashed(plantsId, commonActionData.completionDate);
}

//

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

//

async function getPlantsById(ids: number[]): Promise<Plantas[]> {
  const plantsToUpdate = await prisma.plantas.findMany({
    where: {
      id: { in: ids },
    },
    include: {
      faseCultivo: true
    }
  });

  validatePlants(plantsToUpdate)

  return plantsToUpdate

}

//


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

async function createCropPlantsAction(commonActionData: any) {
  return await prisma.actions.create({
    data: {
      ...commonActionData,
      isLote: false,
      isPlant: true,
      isCrop: true,
      name: "Colheita",
      id_actionType: ACTION_TYPE.COLHEITA,
    },
  });
}

//

function createActionCropsData(action: Actions, crop: Crops, commonActionData: any, changeId: number) {
  const actionCropData: ActionCrops = {
    ...commonActionData,
    id_crop: crop.id,
    id_action: action.id,
  };

  return actionCropData
  
  
}

async function createActionCrops(newactionCrop: ActionCrops) {
  return await prisma.actionCrops.createMany({
    data: newactionCrop,
  });
}


//

function createActionPlantsData(action: Actions, plantsToUpdate: Plantas[], commonActionData: any, changeId: number) {
  return plantsToUpdate.map(plant => {
    const plantData: ActionPlants = {
      ...commonActionData,
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
    if (action.id_actionType === ACTION_TYPE.COLHEITA) {
    }

    return plantData;
  });
}

async function createActionPlants(newActionPlants: ActionPlants[]) {
  return await prisma.actionPlants.createMany({
    data: newActionPlants,
  });
}


//

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


//

async function updatePlantsCropped(plantsId: number[], actionDate: Date, commonActionData: any) {
  
  const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
    where: {
      ordem: 5
    }
  })

  if (!selectedFaseCultivo) {
    throw new Error('Fase de Cultivo para log não existente: Colher');
  }
 
  
  const updatePlantsParams = {
    where: {
      id: { in: plantsId },
    },
    data: {
      cropDate: actionDate,
      id_faseCultivo: selectedFaseCultivo.id
    },
  } as any;
  return await prisma.plantas.updateMany(updatePlantsParams);
}

async function createNewCrop(id_genetic: number, id_location: number, actionDate: Date, commonActionData: any) {

  const selectedFaseCrop = await prisma.fasesCrop.findFirst({
    where: {
      ordem: 3
    }
  })

  if (!selectedFaseCrop) {
    throw new Error('Fase de Crop para log não existente: Colher');
  }

  const selectedGenetic = await prisma.genetics.findFirst({
    where: {
      id: id_genetic
    }
  })

  if (!selectedGenetic) {
    throw new Error('Genética para log não existente');
  }

  const cropId = await prisma.crops.count({
    where: {
      id_genetic: id_genetic
    }
  })+1 

  const newCrop = await prisma.crops.create(
    {
      data: {
        name: selectedGenetic?.nick + "#" + cropId,
        cropDate: commonActionData.actionDate,
        id_genetic: id_genetic,
        id_fasesCrop: selectedFaseCrop.id,
        id_user_create: commonActionData.id_user_create,
        id_location: id_location,
        obs: commonActionData.obs,
        qtPlants: commonActionData.plants.length,
        dryingStartDate: commonActionData.actionDate,
        // cropFullWetMass: cropFullWetMass,
        // cropFlowerWetMass: cropFlowerWetMass,
        // cropWetTrimMass: cropWetTrimMass,
      }
    }
  )
}




export class CreateActionGroupUseCase {
  async execute({
    actionDate,
    plants,
    createdActions,
    completed,
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


    createdActions.forEach(action => {

      const commonActionData = {
        id_user_create,
        id_actionGroup: newActionGroup,
        obs,
        created_at: new Date(),
        qtd: plants.length,
        // scheduledDate: scheduled ? actionDate : undefined,
        startDate: action.startDate,
        endDate: action.endDate,
        isCompleted: action.completed ? true : false,
        completionDate: action.completed ? undefined : action.endDate,
        id_user_completion: action.completed ? undefined : id_user_atribution,
        id_user_atribution: action.id_user_atribution,
        id_actionType: action.id_actionType
      };
      //PLANTS
      //STATE UPDATE ACTIONS 
      if (action?.plants?.length) {
        if (action.id_actionType == ACTION_TYPE.ALTERA_LOCAL) {
          changeLocationPlantas(action.id_location, action.plants, commonActionData)
        }
        if (action.id_actionType == ACTION_TYPE.ALTERA_FASE_CULTIVO) {
          changeFaseCultivoPlantas(action.id_faseCultivo, action.plants, commonActionData)
        }
        if (action.id_actionType == ACTION_TYPE.TRANSPLANTE) {
          changeRecipientePlantas(action.id_recipiente, action.plants, commonActionData)
        }
        if (action.id_actionType == ACTION_TYPE.DESCARTE_PLANTA) {
          trashPlantas(action.id_trashReason, action.plants, commonActionData)
        }
      }

      //OBJECTS CREATION ACTIONS 



    })



    let actionPlants = [] as ActionPlants[];

  }
}
