import { Request, Response } from 'express';
import { CreateGeneticUseCase } from './CreateGeneticUseCase';

export class CreateGeneticController {
  async handle(request: Request, response: Response) {
    const { name, description, nick, id_profile } = request.body;
    const id_user_create = request.id_user

    const createGeneticUseCase = new CreateGeneticUseCase();
    const result = await createGeneticUseCase.execute({
      name,
      nick,
      description,
      id_profile,
      id_user_create
      
    });

    return response.json(result);
  }
}
