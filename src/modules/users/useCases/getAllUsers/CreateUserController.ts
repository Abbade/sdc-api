import { Request, Response } from 'express';
import { GeAllUsersUseCase } from './GeAllUsersUseCase';

export class GeAllUsersController {
  async handle(request: Request, response: Response) {
    const { name, limit,page  } = request.query;
    const permissions = request.permissions;
    const createClientUseCase = new GeAllUsersUseCase();
    const result = await createClientUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
      
    });

    return response.json(result);
  }
}
