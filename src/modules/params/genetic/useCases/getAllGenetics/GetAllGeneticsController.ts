import { Request, Response } from 'express';
import { GetAllGeneticsUseCase } from './GetAllGeneticsUseCase';

export class GetAllGeneticsController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllGeneticsUseCase = new GetAllGeneticsUseCase();
    const result = await getAllGeneticsUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
