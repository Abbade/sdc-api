import { Request, Response } from 'express';
import { CreatePropagationTypeUseCase } from './CreateRoleUseCase';

export class CreateRolesController {
  async handle(request: Request, response: Response) {
    const { name, active, permissions } = request.body;
    const id_user_create = request.id_user
    console.log("AAAAAAAAAAAAAAAA");
    console.log(permissions);
    const createSectionUseCase = new CreatePropagationTypeUseCase();
    const result = await createSectionUseCase.execute({
      name: name ,
      active: active,
      permissions: permissions
    });

    return response.json(result);
  }
}
