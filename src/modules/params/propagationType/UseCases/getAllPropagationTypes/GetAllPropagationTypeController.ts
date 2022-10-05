import { Request, Response } from 'express';
import { GetAllPropagationTypeUseCase } from './GetAllPropagationTypeUseCase';

export class GetAllPropagationTypeController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllPropagationTypeUseCase = new GetAllPropagationTypeUseCase();
    const result = await getAllPropagationTypeUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
