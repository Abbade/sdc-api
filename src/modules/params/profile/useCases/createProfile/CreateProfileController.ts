import { Request, Response } from 'express';
import { CreateProfileUseCase } from './CreateProfileUseCase';

export class CreateProfileController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;
    const id_user_create = request.id_user

    const createProfileUseCase = new CreateProfileUseCase();
    const result = await createProfileUseCase.execute({
      name,
      description,
      id_user_create
      
    });

    return response.json(result);
  }
}
