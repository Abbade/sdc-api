import { Request, Response } from 'express';
import { GetAllGeneticsUseCase } from './GetAllGeneticsUseCase';

export class GetAllGeneticsController {
  async handle(request: Request, response: Response) {
    const { name, limit,page } = request.query;

    const getAllGeneticsUseCase = new GetAllGeneticsUseCase();
    const result = await getAllGeneticsUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
    });

    return response.json(result);
  }
}
