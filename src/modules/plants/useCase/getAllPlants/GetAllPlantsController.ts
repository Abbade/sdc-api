import { Request, Response } from 'express';
import { GetAllPlantsUseCase } from './GetAllPlantsUseCase';

export class GetAllPlantsController {
  async handle(request: Request, response: Response) {
    const { id, name, page, limit, isTrashed, isMother } = request.query as any


    const getAllPlantsUseCase = new GetAllPlantsUseCase();
    const result = await getAllPlantsUseCase.execute({
      id,
      name,
      page,
      limit,
      isTrashed,
      isMother
    });
    return response.json(result);
  }
}
