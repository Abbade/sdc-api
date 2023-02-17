import { Actions, Crops, ActionCrops, Plantas, ActionPlants, ActionGroups } from "@prisma/client";
import { ACTION_TYPE } from "../constants/ACTION_TYPE";
import { prisma } from "../database/prismaClient";


export function createCommonActionData(id_user_create: Number, id_user_atribution: Number, obs: string,newActionGroup: ActionGroups, action: any) {
    const commonActionData = {
        id_user_create,
        id_actionGroup: newActionGroup,
        obs,
        created_at: new Date(),
        qtd: action.plants?.length,
        // scheduledDate: scheduled ? actionDate : undefined,
        startDate: action.startDate,
        endDate: action.endDate,
        isCompleted: action.completed ? true : false,
        completionDate: action.completed ? undefined : action.endDate,
        id_user_completion: action.completed ? undefined : id_user_atribution,
        id_user_atribution: action.id_user_atribution,
        actionTypeId: action.actionTypeId,
      }
}

export async function createActionGroup(id_user_create: number, obs: string, startDate: Date, endDate: Date, name: string) {
    const newActionGroup = await prisma.actionGroups.create({
      data: {
        id_user_create,
        obs,
        startDate,
        endDate,
        name,
      },
    });
    return newActionGroup;
  }

export async function createTrashPlantAction(commonActionData: any) {
    return await prisma.actions.create({
      data: {
        ...commonActionData,
        isLote: false,
        isPlant: true,
        isCrop: false,
        name: "Descarte de Planta",
        actionTypeId: ACTION_TYPE.DESCARTE_PLANTA,
      },
    });
  }
  
  export async function createRecipientChangeAction(commonActionData: any) {
    return await prisma.actions.create({
      data: {
        ...commonActionData,
        isLote: false,
        isPlant: true,
        isCrop: false,
        name: "Alteração de recipiente",
        actionTypeId: ACTION_TYPE.TRANSPLANTE,
      },
    });
  }
  
  export async function createLocationChangeAction(commonActionData: any) {
    return await prisma.actions.create({
      data: {
        ...commonActionData,
        isLote: false,
        isPlant: true,
        isCrop: false,
        name: "Alteração de local",
        actionTypeId: ACTION_TYPE.ALTERA_LOCAL,
      },
    });
  }
  
  export async function createFaseCultivoChangeAction(commonActionData: any) {
    return await prisma.actions.create({
      data: {
        ...commonActionData,
        isLote: false,
        isPlant: true,
        isCrop: false,
        name: "Alteração de fase de cultivo",
        actionTypeId: ACTION_TYPE.ALTERA_FASE_CULTIVO,
      },
    });
  }
  
  export async function createCropPlantsAction(commonActionData: any) {
    return await prisma.actions.create({
      data: {
        ...commonActionData,
        isLote: false,
        isPlant: true,
        isCrop: true,
        name: "Colheita",
        actionTypeId: ACTION_TYPE.COLHEITA,
      },
    });
  }

  export function createActionCropsData(
    action: Actions,
    crop: Crops,
    commonActionData: any,
    changeId: number
  ) {
    const actionCropData: ActionCrops = {
      ...commonActionData,
      id_crop: crop.id,
      id_action: action.id,
    };
  
    return actionCropData;
  }
  
  async function createActionCrops(newactionCrop: ActionCrops) {
    return await prisma.actionCrops.createMany({
      data: newactionCrop,
    });
  }
  
  //
  
  export function createActionPlantsData(
    action: Actions,
    plantsToUpdate: Plantas[],
    commonActionData: any,
    changeId: number
  ) {
    return plantsToUpdate.map((plant) => {
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
  
  export async function createActionPlants(newActionPlants: ActionPlants[]) {
    return await prisma.actionPlants.createMany({
      data: newActionPlants,
    });
  }