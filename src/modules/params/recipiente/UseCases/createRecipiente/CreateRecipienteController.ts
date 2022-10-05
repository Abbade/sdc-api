import { Request, Response } from 'express';
import { CreateRecipienteUseCase } from './CreateRecipienteUseCase';

export class CreateRecipienteController {
  async handle(request: Request, response: Response) {
    const { name, description, ordem } = request.body;

    const createRecipienteUseCase = new CreateRecipienteUseCase();
    const result = await createRecipienteUseCase.execute({
      name,
      description
      
    });

    return response.json(result);
  }
}
