import { Request, Response } from 'express';
import { CreatePropagationTypeUseCase } from './CreatePropagationTypeUseCase';

export class CreatePropagationTypeController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;
    const id_user_create = request.id_user

    const createSectionUseCase = new CreatePropagationTypeUseCase();
    const result = await createSectionUseCase.execute({
      name,
      description,
      id_user_create
      
    });

    return response.json(result);
  }
}
