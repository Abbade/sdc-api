import { Request, Response } from 'express';
import { GetAllProfilesUseCase } from './GetAllProfilesUseCase';

export class GetAllProfileController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllProfilesUseCase = new GetAllProfilesUseCase();
    const result = await getAllProfilesUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
