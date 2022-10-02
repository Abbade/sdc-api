import { Request, Response } from 'express';
import { GeAllUsersUseCase } from './GeAllUsersUseCase';

export class GeAllUsersController {
  async handle(request: Request, response: Response) {
    //const { email, password, name } = request.body;

    const createClientUseCase = new GeAllUsersUseCase();
    const result = await createClientUseCase.execute({});

    return response.json(result);
  }
}
