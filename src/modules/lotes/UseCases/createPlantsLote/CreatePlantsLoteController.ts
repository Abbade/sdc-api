import { Request, Response } from 'express';
import { CreatePlantsLoteUseCase } from './CreatePlantsLoteUseCase';

export class CreatePlantsLoteController {
  async handle(request: Request, response: Response) {
    const { id_lote, id_location,id_recipiente,aclimatationDate, qtPlant, obs} = request.body;
    const id_user_create = request.id_user

    const createPlantsLoteUseCase = new CreatePlantsLoteUseCase();
    const result = await createPlantsLoteUseCase.execute({
      id_lote, aclimatationDate, qtPlant, obs, id_user_create, id_location, id_recipiente
    });

    return response.json(result);
  }
}
