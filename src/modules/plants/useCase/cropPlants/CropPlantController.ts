import { Request, Response } from 'express';
import { CropPlantUseCase } from './CropPlantUseCase';

export class CropPlantController {
  async handle(request: Request, response: Response) {
    const { actionDate, plants, obs, cropFullWetMass, cropWetTrimMass, cropFlowerWetMass, id_location} = request.body;
    const id_user_create = request.id_user

    const cropPlantUseCase = new CropPlantUseCase();
    const result = await cropPlantUseCase.execute({
      actionDate, plants, id_location,id_user_create, obs, cropFullWetMass,
      cropWetTrimMass,
      cropFlowerWetMass
    });

    return response.json(result);
  }
}
