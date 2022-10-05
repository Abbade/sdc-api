import { Request, Response } from 'express';
import { CreateLoteUseCase } from './CreateLoteUseCase';

export class CreateLoteController {
  async handle(request: Request, response: Response) {
    const { propDate, id_propagationType, id_genetic, id_location_init, qtTotal, obs } = request.body;

    const createLoteUseCase = new CreateLoteUseCase();
    const result = await createLoteUseCase.execute({
      propDate,
      id_propagationType,
      id_genetic,
      id_location_init,
      qtTotal,
      obs

    });

    return response.json(result);
  }
}
