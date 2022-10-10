import { Request, Response } from 'express';
import { MeUseCase } from './MeUseCase';

export class MeController {
  async handle(request: Request, response: Response) {
    const authenticateClientUseCase = new MeUseCase();
    let id = request.id_user;
    const result = await authenticateClientUseCase.execute({id});

    return response.json(result);
  }
}
