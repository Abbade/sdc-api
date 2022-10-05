import { Request, Response } from 'express';
import { CreateLocationUseCase } from './CreateLocationUseCase';

export class CreateLocationController {
  async handle(request: Request, response: Response) {
    const { name, description, id_section } = request.body;

    const createLocationUseCase = new CreateLocationUseCase();
    const result = await createLocationUseCase.execute({
      name,
      description,
      id_section
      
    });

    return response.json(result);
  }
}
