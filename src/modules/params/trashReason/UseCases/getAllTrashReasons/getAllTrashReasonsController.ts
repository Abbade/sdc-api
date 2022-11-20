import { Request, Response } from 'express';
import { GetAllTrashReasonsUseCase } from './getAllTrashReasonsUseCase';

export class GetAllTrashReasonsController {
  async handle(request: Request, response: Response) {
    const {  name, limit,page } = request.query;

    const getAllTrashReasonsUseCase = new GetAllTrashReasonsUseCase();
    const result = await getAllTrashReasonsUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
      
    });

    return response.json(result);
  }
}
