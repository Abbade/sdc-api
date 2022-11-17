import { Request, Response } from 'express';
import { CreateActionUseCase } from './CreateActionUseCase';

export class CreateActionController {
  async handle(request: Request, response: Response) {
    const { name, description, ordem } = request.body;
    const id_user_create = request.id_user
    const createActionUseCase = new CreateActionUseCase();
    const result = await createActionUseCase.execute({
      name,
      description,
      ordem,
      id_user_create
      
    });

    return response.json(result);
  }
}
