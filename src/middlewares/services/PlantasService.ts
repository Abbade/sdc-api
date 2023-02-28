import { createRecipientChangeAction, createActionPlantsData, createActionPlants, createLocationChangeAction, createFaseCultivoChangeAction, createTrashPlantAction } from "../repository/ActionsRepository";
import { findFaseCultivoById } from "../repository/ParamsRepository";
import { getPlantsById, updatePlantsFaseCultivo, updatePlantsLocation, updatePlantsRecipient, updatePlantsTrashed } from "../repository/PlantasRepository";
import { validateRecipiente, validateLocation, validateFaseCultivo, validateTrashReason } from "../validation/Validator";

export async function changeRecipientePlantas(
    recipientId: number,
    plantsId: number[],
    commonActionData: any
  ) {
    await validateRecipiente(recipientId);
    const plantsToUpdate = await getPlantsById(plantsId);
    const selectedRecipienteChangeAction = await createRecipientChangeAction(
      commonActionData
    );
    const newActionPlants = createActionPlantsData(
      selectedRecipienteChangeAction,
      plantsToUpdate,
      commonActionData,
      recipientId
    );
    await createActionPlants(newActionPlants);
    commonActionData.isCompleted ? await updatePlantsRecipient(plantsId, recipientId, commonActionData.completionDate) : ""
  }
  
  export async function changeLocationPlantas(
    id_location: number,
    plantsId: number[],
    commonActionData: any
  ) {
    await validateLocation(id_location);
    const plantsToUpdate = await getPlantsById(plantsId);
    const selectedLocationChangeAction = await createLocationChangeAction(
      commonActionData
    );
    const newActionPlants = createActionPlantsData(
      selectedLocationChangeAction,
      plantsToUpdate,
      commonActionData,
      id_location
    );
    await createActionPlants(newActionPlants);
    commonActionData.isCompleted ? await updatePlantsLocation(plantsId, id_location) : ""
  }
  
  export async function changeFaseCultivoPlantas(
    stageId: number,
    plantsId: number[],
    commonActionData: any
  ) {
    await validateFaseCultivo(stageId);
    const plantsToUpdate = await getPlantsById(plantsId);
    const selectedFaseCultivo = await findFaseCultivoById(stageId);
    const selectedFaseCultivoChangeAction = await createFaseCultivoChangeAction(
      commonActionData
    );
    const newActionPlants = createActionPlantsData(
      selectedFaseCultivoChangeAction,
      plantsToUpdate,
      commonActionData,
      stageId
    );
    await createActionPlants(newActionPlants);
    commonActionData.isCompleted ? await updatePlantsFaseCultivo(plantsId, stageId, selectedFaseCultivo.id_tipo_fase_cultivo, commonActionData.completionDate) : ""
  }
  
  export async function trashPlantas(
    trashReasonId: number,
    plantsId: number[],
    commonActionData: any
  ) {
    await validateTrashReason(trashReasonId);
    const plantsToUpdate = await getPlantsById(plantsId);
    const selectedTrashPlantaAction = await createTrashPlantAction(
      commonActionData
    );
    const newActionPlants = createActionPlantsData(
      selectedTrashPlantaAction,
      plantsToUpdate,
      commonActionData,
      trashReasonId
    );
    await createActionPlants(newActionPlants);


    commonActionData.isCompleted ? await updatePlantsTrashed(plantsId, commonActionData.completionDate) : "Atividade agendada com sucesso"
  }
  