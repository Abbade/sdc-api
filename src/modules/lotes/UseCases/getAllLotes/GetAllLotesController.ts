import { Request, Response } from 'express';
import { GetAllLotesUseCase } from './GetAllLotesUseCase';

export class GetAllLotesController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllLotesUseCase = new GetAllLotesUseCase();
    const result = await getAllLotesUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
