import { Request, Response } from 'express';
import { GetAllLocationsUseCase } from './GetAllLocationsUseCase';

export class GetAllLocationsController {
  async handle(request: Request, response: Response) {
    const { name, limit,page } = request.query;

    const getAllLocationsUseCase = new GetAllLocationsUseCase();
    const result = await getAllLocationsUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
    
    });

    return response.json(result);
  }
}
