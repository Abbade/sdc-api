import { Request, Response } from 'express';
import { GetAllFasesCultivoUseCase as GetAllActionsUseCase } from './getAllActionsUseCase';

export class GetAllActionsController {
  async handle(request: Request, response: Response) {
    const {  selectedPlant, page, limit, id } = request.query;

    const getAllActionsUseCase = new GetAllActionsUseCase();
    const result = await getAllActionsUseCase.execute({
      id:id ? Number.parseInt(id?.toString() as string) : undefined, 
      page: Number.parseInt(page?.toString() as string),
      limit:Number.parseInt(limit?.toString() as string) 
    });

    return response.json(result);
  }
}
