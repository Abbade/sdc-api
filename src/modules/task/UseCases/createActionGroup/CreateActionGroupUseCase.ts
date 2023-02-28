import {
  ActionPlants
} from "@prisma/client";
import { ACTION_TYPE } from "../../../../constants/ACTION_TYPE";
import { createActionGroup, createCommonActionData } from "../../../../middlewares/repository/ActionsRepository";
import { changeFaseCultivoPlantas, changeLocationPlantas, changeRecipientePlantas, trashPlantas } from "../../../../middlewares/services/PlantasService";



interface ITransplantPlants {
  id_user_create: number;
  actionDate: Date;
  start: Date;
  end: Date;
  plants: number[];
  completed: boolean;

  actions: {
    actionTypeId: number;
    plants?: number[];
    lotes?: number[];
    crops?: number[];
    completed: boolean;
    completionDate: Date;
    userComplete: number;
    startDate: Date;
    endDate: Date;
    obs: string;
    id_user_atribution: number;

    //params
    id_genetic: number;
    recipientId: number;
    stageId: number;
    id_location: number;
    trashReasonId: number;
  }[];

  recipientId: number;
  id_location: number;
  stageId: number;

  id_user_atribution: number;
  scheduled: boolean;
  obs: string;
  name: string;
}

export class CreateActionGroupUseCase {
  async execute({
    actions,
    id_user_create,
    obs,
    name,
    id_user_atribution,
    start,
    end,
  }: ITransplantPlants) {

    const newActionGroup = await createActionGroup(id_user_create,obs,start,end,name)

    actions.forEach((action) => {
      const commonActionData = createCommonActionData(id_user_create,id_user_atribution,obs,newActionGroup,action)
      //PLANTS
      //STATE UPDATE ACTIONS
      if (action?.plants?.length) {
        if (action.actionTypeId == ACTION_TYPE.ALTERA_LOCAL) {
          changeLocationPlantas(
            Number.parseInt(action.id_location.toString()),
            action.plants,
            commonActionData
          );
        }
        if (action.actionTypeId == ACTION_TYPE.ALTERA_FASE_CULTIVO) {
          changeFaseCultivoPlantas(
            Number.parseInt(action.stageId.toString()),
            action.plants,
            commonActionData
          );
        }
        if (action.actionTypeId == ACTION_TYPE.TRANSPLANTE) {
          changeRecipientePlantas(
            Number.parseInt(action.recipientId.toString()),
            action.plants,
            commonActionData
          );
        }
        if (action.actionTypeId == ACTION_TYPE.DESCARTE_PLANTA) {
          trashPlantas(
            Number.parseInt(action.trashReasonId.toString()),
            action.plants,
            commonActionData
          );
        }
      }

      //OBJECTS CREATION ACTIONS
    });

    let actionPlants = [] as ActionPlants[];
  }
}
