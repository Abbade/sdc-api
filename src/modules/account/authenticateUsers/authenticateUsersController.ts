import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './authenticateUsersUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateClientUseCase = new AuthenticateUserUseCase();
    const result = await authenticateClientUseCase.execute({
      email,
      password,
    });

    return response.json(result);
  }
}
