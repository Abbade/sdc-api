import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetPropagationTypeUseCase } from './GetPropagationTypeUseCase';

export class GetPropagationTypeController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetPropagationTypeUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
