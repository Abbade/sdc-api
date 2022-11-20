import { Request, Response } from 'express';
import { GetAllProfilesUseCase } from './GetAllProfilesUseCase';

export class GetAllProfileController {
  async handle(request: Request, response: Response) {
    const { name, limit,page} = request.query;

    const getAllProfilesUseCase = new GetAllProfilesUseCase();
    const result = await getAllProfilesUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
      
    });

    return response.json(result);
  }
}
