import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name, id_role } = request.body;

    const createClientUseCase = new CreateUserUseCase();
    const result = await createClientUseCase.execute({
      email,
      name,
      password,
      id_role: Number.parseInt(id_role?.toString() as string)
    });

    return response.json(result);
  }
}
