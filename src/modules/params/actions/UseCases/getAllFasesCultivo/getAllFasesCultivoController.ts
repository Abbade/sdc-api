import { Request, Response } from 'express';
import { GetAllFasesCultivoUseCase } from './getAllFasesCultivoUseCase';

export class GetAllFasesCultivoController {
  async handle(request: Request, response: Response) {
    const { name, page, limit } = request.query;

    const getAllFasesCultivoUseCase = new GetAllFasesCultivoUseCase();
    const result = await getAllFasesCultivoUseCase.execute({
      name : name?.toString(),
      page: Number.parseInt(page?.toString() as string),
      limit:Number.parseInt(limit?.toString() as string) 
    });

    return response.json(result);
  }
}
