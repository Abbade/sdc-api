import { Request, Response } from 'express';
import { CreateFaseCultivoUseCase } from './CreateFaseCultivoUseCase';

export class CreateFaseCultivoController {
  async handle(request: Request, response: Response) {
    const { name, description, ordem } = request.body;

    const createSectionUseCase = new CreateFaseCultivoUseCase();
    const result = await createSectionUseCase.execute({
      name,
      description,
      ordem
      
    });

    return response.json(result);
  }
}
