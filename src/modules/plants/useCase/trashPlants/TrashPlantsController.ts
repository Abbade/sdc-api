import { Request, Response } from 'express';
import { TrashPlantsUseCase } from './TrashPlantsUseCase';

export class TrashPlantsController {
  async handle(request: Request, response: Response) {
    const { trashDate, plants, id_trashReason, id_location, obs} = request.body;
    const id_user_create = request.id_user

    const trashPlantsUseCase = new TrashPlantsUseCase();
    const result = await trashPlantsUseCase.execute({
      trashDate, plants, id_location,id_trashReason, id_user_create, obs
    });

    return response.json(result);
  }
}
