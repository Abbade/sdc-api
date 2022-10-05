import { Request, Response } from 'express';
import { CreateOrganizationUseCase } from './CreateOrganizationUseCase';

export class CreateOrganizationController {
  async handle(request: Request, response: Response) {
    const { name, nick, description } = request.body;
    const id_user_create = request.id_user
    console.log(id_user_create)
    const createOrganizationUseCase = new CreateOrganizationUseCase();
    const result = await createOrganizationUseCase.execute({
      name,
      nick,
      description,
      id_user_create

    });

    return response.json(result);
  }
}
