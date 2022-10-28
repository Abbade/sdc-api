import { Request, Response } from 'express';
import { UpdatePropagationTypeUseCase } from './UpdatePropagationTypeUseCase';

export class UpdatePropagationTypeController {
  async handle(request: Request, response: Response) {
    const { name, description, id } = request.body;

    const createSectionUseCase = new UpdatePropagationTypeUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      description,
    });

    return response.json(result);
  }
}
