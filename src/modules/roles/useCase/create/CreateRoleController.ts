import { Request, Response } from 'express';
import { CreatePropagationTypeUseCase } from './CreateRoleUseCase';

export class CreateRolesController {
  async handle(request: Request, response: Response) {
    const { name, active } = request.body;
    const id_user_create = request.id_user

    const createSectionUseCase = new CreatePropagationTypeUseCase();
    const result = await createSectionUseCase.execute({
      name: name ,
      active: active
    });

    return response.json(result);
  }
}
