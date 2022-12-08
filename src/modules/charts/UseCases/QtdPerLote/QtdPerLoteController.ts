import { Request, Response } from 'express';
import { QtdPerLoteUseCase } from './QtdPerLoteUseCase';

export class QtdPerLoteController {
  async handle(request: Request, response: Response) {
    const { filterType } = request.query as any


    const useCase = new QtdPerLoteUseCase();
    const result = await useCase.execute({
      filterType
    });
    return response.json(result);
  }
}
