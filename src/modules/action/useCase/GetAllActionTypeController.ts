import { Request, Response } from 'express';
import { IFilter } from '../../../interfaces/IFilter';
import { GetAllActionTypeUseCase } from './GetAllActionTypeUseCase';

export class GetAllActionTypeController {
  async handle(request: Request, response: Response) {

    const { name, limit,page  } = request.query;
    const getAllPropagationTypeUseCase = new GetAllActionTypeUseCase();
    const result = await getAllPropagationTypeUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
      
    });

    return response.json(result);
  }
}
