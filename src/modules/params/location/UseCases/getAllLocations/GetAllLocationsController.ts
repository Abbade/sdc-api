import { Request, Response } from 'express';
import { GetAllLocationsUseCase } from './GetAllLocationsUseCase';

export class GetAllLocationsController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllLocationsUseCase = new GetAllLocationsUseCase();
    const result = await getAllLocationsUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
