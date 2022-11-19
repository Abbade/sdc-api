import { Request, Response } from 'express';
import { UpdateGeneticUseCase } from './UpdateGeneticUseCase';

export class UpdateGeneticController {
  async handle(request: Request, response: Response) {
    const {name, description, id_profile, nick, id} = request.body;
    const id_user_create = request.id_user
    const createSectionUseCase = new UpdateGeneticUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      description,
      id_profile,
      nick,
      id_user_create
    });

    return response.json(result);
  }
}
