import { Request, Response } from 'express';
import { CreateTrashReasonUseCase } from './CreateTrashReasonUseCase';

export class CreateTrashReasonController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSectionUseCase = new CreateTrashReasonUseCase();
    const result = await createSectionUseCase.execute({
      name,
      description
      
    });

    return response.json(result);
  }
}
