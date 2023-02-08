import { Request, Response } from "express";
import { CreateActionGroupUseCase } from "./CreateActionGroupUseCase";

export class CreateActionGroupController {
  async handle(request: Request, response: Response) {
    const {
      actionDate,
      plants,
      id_recipiente,
      id_location,
      id_faseCultivo,
      obs,
      name,
      id_user_atribution,
      scheduled,
      startDate,
      endDate
    } = request.body;
    const id_user_create = request.id_user;

    const transplantPlantsUseCase = new CreateActionGroupUseCase();
      const result = await transplantPlantsUseCase.execute({
        id_user_create,
        id_user_atribution,
        scheduled,
        startDate,
        endDate,
        name,
        obs,
        actionDate,
        
        plants,
        id_recipiente,
        id_location,
        id_faseCultivo,
        
      });

      return response.json(result);
    
  }
}
