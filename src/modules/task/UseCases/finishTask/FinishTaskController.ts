import { Request, Response } from "express";
import { TransplantPlantsUseCase } from "./FinishTaskUseCase";

export class TransplantPlantsController {
  async handle(request: Request, response: Response) {
    const {
      transplantDate,
      plants,
      id_recipiente,
      id_location,
      id_faseCultivo,
      id_action,
      id_action_type,
      obs,
      id_user_completion,
      scheduled,
      actionPlants,
      actionCrop,
      actionLote,
      startDate,
      endDate
    } = request.body;
    const id_user_create = request.id_user;

    const transplantPlantsUseCase = new TransplantPlantsUseCase();
    if (id_recipiente != null && transplantDate != null) {
      const result = await transplantPlantsUseCase.execute({
        transplantDate,
        plants,
        actionPlants,
        actionCrop,
        actionLote,
        id_recipiente,
        id_location,
        id_faseCultivo,
        id_user_create,
        id_user_completion,
        id_action,
        id_action_type,
        scheduled,
        startDate,
        endDate,
        obs,
      });

      return response.json(result);
    } else {
      throw new Error(
        "Deve conter um recipiente e uma data para efetuar o transplante"
      );
    }
  }
}
