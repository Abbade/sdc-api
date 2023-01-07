import { Request, Response } from 'express';
import { FinishCropUseCase } from './FinishCropUseCase';

export class FinishCropController {
  async handle(request: Request, response: Response) {
    const { actionDate, id_crop, id_location,cropDriedTrimMass,cropDriedFlowerMass,cropFullDriedMass,qtPacks, obs} = request.body;
    const id_user_create = request.id_user

    const transformPlantsIntoMotherUseCase = new FinishCropUseCase();
    const result = await transformPlantsIntoMotherUseCase.execute({
      actionDate, id_crop, id_location,cropDriedTrimMass,cropDriedFlowerMass,cropFullDriedMass,id_user_create,qtPacks ,obs
    });

    return response.json(result);
  }
}
