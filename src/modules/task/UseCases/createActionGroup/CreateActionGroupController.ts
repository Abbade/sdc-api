import { Request, Response } from "express";
import { CreateActionGroupUseCase } from "./CreateActionGroupUseCase";

export class CreateActionGroupController {
  async handle(request: Request, response: Response) {
    const {
      actionDate,
      plants,
      recipientId,
      id_location,
      stageId,
      obs,
      title,
      id_user_atribution,
      scheduled,
      completed,
      actions,
      start,
      end,
    } = request.body;
    const id_user_create = request.id_user;

    const transplantPlantsUseCase = new CreateActionGroupUseCase();
    const result = await transplantPlantsUseCase.execute({
      id_user_create,
      id_user_atribution,
      scheduled,
      start,
      end,
      name: title,
      obs,
      actionDate,
      completed,
      actions,
      plants,
      recipientId,
      id_location,
      stageId,
    });

    return response.json(result);
  }
}
