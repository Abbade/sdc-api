import { Request, Response } from 'express';
import { GetAllOrganizationsUseCase } from './GetAllOrganizationsUseCase';

export class GetAllOrganizationsController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllOrganizationsUseCase = new GetAllOrganizationsUseCase();
    const result = await getAllOrganizationsUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
