import { Request, Response } from 'express';
import { UpdateRolesUseCase } from './UpdateRolesUseCase';

export class UpdateRolesController {
  async handle(request: Request, response: Response) {
    const { name, active, id, permissions } = request.body;

    const createSectionUseCase = new UpdateRolesUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      active,
      permissions
    });

    return response.json(result);
  }
}
