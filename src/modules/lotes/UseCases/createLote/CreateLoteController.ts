import { Request, Response } from 'express';
import { CreateLoteUseCase } from './CreateLoteUseCase';

export class CreateLoteController {
  async handle(request: Request, response: Response) {
    const { propDate, id_propagationType, id_genetic, id_location_init, id_recipiente,id_mother,qtTotal, obs, scheduled, id_user_atribution } = request.body;
    const id_user_create = request.id_user
    const createLoteUseCase = new CreateLoteUseCase();
    const result = await createLoteUseCase.execute({
      propDate,
      id_propagationType,
      id_recipiente,
      id_genetic,
      id_location_init,
      id_mother,
      qtTotal,
      obs,
      id_user_create,
      scheduled,
      id_user_atribution

    });

    return response.json(result);
  }
}
