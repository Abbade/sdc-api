import { Request, Response } from 'express';
import { createCloneUseCase } from './createCloneUseCase';

export class createCloneController {
  async handle(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const createClientUseCase = new createCloneUseCase();
    const result = await createClientUseCase.execute({
      email,
      name,
      password,
    });

    return response.json(result);
  }
}
