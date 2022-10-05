import { Request, Response } from 'express';
import { CreatePropagationTypeUseCase } from './CreatePropagationTypeUseCase';

export class CreatePropagationTypeController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSectionUseCase = new CreatePropagationTypeUseCase();
    const result = await createSectionUseCase.execute({
      name,
      description
      
    });

    return response.json(result);
  }
}
