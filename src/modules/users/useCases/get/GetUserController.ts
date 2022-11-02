import { Request, Response } from 'express';
import { IRetrieve } from '../../../../interfaces/IRetrieve';
import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetUserUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
