import { Request, Response } from 'express';
import { CreateSectionUseCase } from './CreateSectionUseCase';

export class CreateSectionController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSectionUseCase = new CreateSectionUseCase();
    const result = await createSectionUseCase.execute({
      name,
      description
      
    });

    return response.json(result);
  }
}
