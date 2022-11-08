import { Request, Response } from 'express';
import { TransformPlantsIntoMotherUseCase } from './TransformPlantsIntoMotherUseCase';

export class TransformPlantsIntoMotherController {
  async handle(request: Request, response: Response) {
    const { actionDate, plants, obs} = request.body;
    const id_user_create = request.id_user

    const transformPlantsIntoMotherUseCase = new TransformPlantsIntoMotherUseCase();
    const result = await transformPlantsIntoMotherUseCase.execute({
      actionDate, plants, id_user_create, obs
    });

    return response.json(result);
  }
}
