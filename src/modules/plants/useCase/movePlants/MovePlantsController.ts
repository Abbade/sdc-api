import { Request, Response } from 'express';
import { MovePlantsUseCase } from './MovePlantsUseCase';

export class MovePlantsController {
  async handle(request: Request, response: Response) {
    const { moveDate, plants, id_location, obs, scheduled, id_user_atribution} = request.body;
    const id_user_create = request.id_user

    const movePlantsUseCase = new MovePlantsUseCase();
    const result = await movePlantsUseCase.execute({
      moveDate, plants, id_location, id_user_create, obs, scheduled, id_user_atribution
    });

    return response.json(result);
  }
}
