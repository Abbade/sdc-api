import { Request, Response } from 'express';
import { GetAllRecipientesUseCase } from './getAllRecipientesUseCase';

export class GetAllRecipientesController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllRecipientesUseCase = new GetAllRecipientesUseCase();
    const result = await getAllRecipientesUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
