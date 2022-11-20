import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetSectionUseCase } from './GetSectionUseCase';

export class GetSectionController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetSectionUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
