import { Request, Response } from 'express';
import { GetAllLotesUseCase } from './GetAllLotesUseCase';

export class GetAllLotesController {
  async handle(request: Request, response: Response) {
    const { id, name, page, limit } = request.query as any


    const getAllLotesUseCase = new GetAllLotesUseCase();
    const result = await getAllLotesUseCase.execute({
      id,
      name,
      page,
      limit
    });
    return response.json(result);
  }
}
