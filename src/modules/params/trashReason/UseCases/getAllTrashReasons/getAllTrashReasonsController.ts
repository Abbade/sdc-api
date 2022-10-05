import { Request, Response } from 'express';
import { GetAllTrashReasonsUseCase } from './getAllTrashReasonsUseCase';

export class GetAllTrashReasonsController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllTrashReasonsUseCase = new GetAllTrashReasonsUseCase();
    const result = await getAllTrashReasonsUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
