import { Request, Response } from 'express';
import { AuthenticateClientUseCase } from './authenticateUsersUseCase';

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateClientUseCase = new AuthenticateClientUseCase();
    const result = await authenticateClientUseCase.execute({
      email,
      password,
    });

    return response.json(result);
  }
}
