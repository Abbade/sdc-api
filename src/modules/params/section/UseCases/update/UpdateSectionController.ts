import { Request, Response } from 'express';
import { UpdateSectionUseCase } from './UpdateSectionUseCase';

export class UpdateSectionController {
  async handle(request: Request, response: Response) {
    const {name, description, id} = request.body;
    const id_user_create = request.id_user
    const createSectionUseCase = new UpdateSectionUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      description,
      id_user_create
    });

    return response.json(result);
  }
}
