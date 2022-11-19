import { Request, Response } from 'express';
import { UpdateFaseCultivoUseCase } from './UpdateFaseCultivoUseCase';

export class UpdateFaseCultivoController {
  async handle(request: Request, response: Response) {
    const {name, description, ordem, id } = request.body;

    const createSectionUseCase = new UpdateFaseCultivoUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      description,
      ordem
    });

    return response.json(result);
  }
}
