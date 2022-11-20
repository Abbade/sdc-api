import { Request, Response } from 'express';
import { GetAllRecipientesUseCase } from './getAllRecipientesUseCase';

export class GetAllRecipientesController {
  async handle(request: Request, response: Response) {
    const {name, limit,page } = request.query;

    const getAllRecipientesUseCase = new GetAllRecipientesUseCase();
    const result = await getAllRecipientesUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)    
    });

    return response.json(result);
  }
}
