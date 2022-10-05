import { Request, Response } from 'express';
import { CreateTrashReasonUseCase } from './CreateTrashReasonUseCase';

export class CreateTrashReasonController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;
    const id_user_create = request.id_user

    const createSectionUseCase = new CreateTrashReasonUseCase();
    const result = await createSectionUseCase.execute({
      name,
      description,
      id_user_create
      
    });

    return response.json(result);
  }
}
