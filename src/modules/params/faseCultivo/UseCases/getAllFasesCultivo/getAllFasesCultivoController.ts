import { Request, Response } from 'express';
import { GetAllFasesCultivoUseCase } from './getAllFasesCultivoUseCase';

export class GetAllFasesCultivoController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllFasesCultivoUseCase = new GetAllFasesCultivoUseCase();
    const result = await getAllFasesCultivoUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
