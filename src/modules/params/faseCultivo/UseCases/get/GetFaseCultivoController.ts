import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetFaseCultivoUseCase } from './GetFaseCultivoUseCase';

export class GetFaseCultivoController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetFaseCultivoUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
