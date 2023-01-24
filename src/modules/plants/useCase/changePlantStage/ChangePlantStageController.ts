import { Request, Response } from 'express';
import { ChangePlantStageUseCase } from './ChangePlantStageUseCase';

export class ChangePlantStageController {
  async handle(request: Request, response: Response) {
    const { actionDate, plants, id_faseCultivo, obs, id_user_atribution, scheduled} = request.body;
    const id_user_create = request.id_user

    const changePlantStageUseCase = new ChangePlantStageUseCase();
    const result = await changePlantStageUseCase.execute({
      actionDate, plants, id_faseCultivo, id_user_create, obs, id_user_atribution, scheduled
    });

    return response.json(result);
  }
}
