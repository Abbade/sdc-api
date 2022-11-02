import { Request, Response } from 'express';
import { ICreateUser } from '../createUser/CreateUserUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, id, id_role } = request.body;

    const createSectionUseCase = new UpdateUserUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      email,
      id_role: Number.parseInt(id_role?.toString() as string)
    } as ICreateUser);

    return response.json(result);
  }
}
