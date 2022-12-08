import { Request, Response } from 'express';
import { QtdPerTrashReasonUseCase } from './QtdPerTrashReasonUseCase';

export class QtdPerTrashReasonController {
  async handle(request: Request, response: Response) {
    const { filterType } = request.query as any


    const useCase = new QtdPerTrashReasonUseCase();
    const result = await useCase.execute({
      filterType
    });
    return response.json(result);
  }
}
