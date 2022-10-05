import { Request, Response } from 'express';
import { CreateRecipienteUseCase } from './CreateRecipienteUseCase';

export class CreateRecipienteController {
  async handle(request: Request, response: Response) {
    const { name, description, ordem } = request.body;
    const id_user_create = request.id_user

    const createRecipienteUseCase = new CreateRecipienteUseCase();
    const result = await createRecipienteUseCase.execute({
      name,
      description,
      id_user_create
      
    });

    return response.json(result);
  }
}
