import { Request, Response } from 'express';
import { MovePlantsUseCase } from './MovePlantsUseCase';

export class MovePlantsController {
  async handle(request: Request, response: Response) {
    const { moveDate, plants, id_location, obs, scheduled, id_user_atribution,startDate,endDate} = request.body;
    const id_user_create = request.id_user

    const movePlantsUseCase = new MovePlantsUseCase();
    const result = await movePlantsUseCase.execute({
      moveDate, plants, id_location, id_user_create, obs, scheduled, id_user_atribution,startDate,endDate
    });

    return response.json(result);
  }
}
