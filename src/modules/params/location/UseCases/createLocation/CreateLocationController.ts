import { Request, Response } from 'express';
import { CreateLocationUseCase } from './CreateLocationUseCase';

export class CreateLocationController {
  async handle(request: Request, response: Response) {
    const { name, description, id_section, id_faseCultivo } = request.body;
    const id_user_create = request.id_user

    const createLocationUseCase = new CreateLocationUseCase();
    const result = await createLocationUseCase.execute({
      name,
      description,
      id_faseCultivo,
      id_section,
      id_user_create
      
    });

    return response.json(result);
  }
}
