import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetGeneticUseCase } from './GetGeneticUseCase';

export class GetGeneticController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetGeneticUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
