import { Request, Response } from 'express';
import { CreateGeneticUseCase } from './CreateGeneticUseCase';

export class CreateGeneticController {
  async handle(request: Request, response: Response) {
    const { name, description, nick, id_profile } = request.body;

    const createGeneticUseCase = new CreateGeneticUseCase();
    const result = await createGeneticUseCase.execute({
      name,
      nick,
      description,
      id_profile
      
    });

    return response.json(result);
  }
}
