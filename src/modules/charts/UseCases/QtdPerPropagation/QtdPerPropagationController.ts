import { Request, Response } from 'express';
import { QtdPerPropagationUseCase } from './QtdPerPropagationUseCase';

export class QtdPerPropagationController {
  async handle(request: Request, response: Response) {
    const { filterType } = request.query as any


    const useCase = new QtdPerPropagationUseCase();
    const result = await useCase.execute({
      filterType
    });
    return response.json(result);
  }
}
