import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetRecipienteUseCase } from './GetRecipienteUseCase';

export class GetRecipienteController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetRecipienteUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
