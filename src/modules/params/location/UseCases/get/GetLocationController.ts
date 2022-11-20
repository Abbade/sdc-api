import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetLocationUseCase } from './GetLocationUseCase';

export class GetLocationController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetLocationUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
