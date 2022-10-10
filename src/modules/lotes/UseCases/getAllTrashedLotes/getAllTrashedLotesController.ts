import { Request, Response } from 'express';
import { GetAllTrashedLotesUseCase } from './GetAllTrashedLotesUseCase';

export class GetAllTrashedLotesController {
  async handle(request: Request, response: Response) {
    const { id, name, page, limit } = request.query as any


    const getAllTrashedLotesUseCase = new GetAllTrashedLotesUseCase();
    const result = await getAllTrashedLotesUseCase.execute({
      id,
      name,
      page,
      limit
    });
    return response.json(result);
  }
}
