import { Request, Response } from 'express';
import { TransplantPlantsUseCase } from './TransplantPlantsUseCase';

export class TransplantPlantsController {
  async handle(request: Request, response: Response) {
    const { transplantDate, plants, id_recipiente, id_location, id_faseCultivo, obs} = request.body;
    const id_user_create = request.id_user

    const transplantPlantsUseCase = new TransplantPlantsUseCase();
    const result = await transplantPlantsUseCase.execute({
      transplantDate, plants, id_recipiente, id_location, id_faseCultivo ,id_user_create, obs
    });

    return response.json(result);
  }
}
