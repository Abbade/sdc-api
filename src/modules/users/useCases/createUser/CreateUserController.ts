import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const createClientUseCase = new CreateUserUseCase();
    const result = await createClientUseCase.execute({
      email,
      name,
      password,
    });

    return response.json(result);
  }
}
