import { Request, Response } from 'express';
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

export class UpdateCompanyController {
  async handle(request: Request, response: Response) {
    const { name, email, id } = request.body;

    const createSectionUseCase = new UpdateCompanyUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      email
    });

    return response.json(result);
  }
}
