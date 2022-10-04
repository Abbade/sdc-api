import { Request, Response } from 'express';
import { CreateProfileUseCase } from './CreateProfileUseCase';

export class CreateProfileController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createProfileUseCase = new CreateProfileUseCase();
    const result = await createProfileUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
