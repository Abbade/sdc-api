import { Request, Response } from 'express';
import { CreateTimeSeriesUseCase } from './CreateTimeSeriesUseCase';

export class CreateTimeSeriesController {
  async handle(request: Request, response: Response) {
    const { filterType } = request.query as any


    const useCase = new CreateTimeSeriesUseCase();
    const result = await useCase.execute({
      filterType
    });
    return response.json(result);
  }
}
