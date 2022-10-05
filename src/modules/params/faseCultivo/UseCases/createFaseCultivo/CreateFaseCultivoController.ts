import { Request, Response } from 'express';
import { CreateFaseCultivoUseCase } from './CreateFaseCultivoUseCase';

export class CreateFaseCultivoController {
  async handle(request: Request, response: Response) {
    const { name, description, ordem } = request.body;
    const id_user_create = request.id_user
    const createSectionUseCase = new CreateFaseCultivoUseCase();
    const result = await createSectionUseCase.execute({
      name,
      description,
      ordem,
      id_user_create
      
    });

    return response.json(result);
  }
}
