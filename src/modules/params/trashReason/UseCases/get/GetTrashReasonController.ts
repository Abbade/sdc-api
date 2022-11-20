import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetTrashReasonUseCase } from './GetTrashReasonUseCase';

export class GetTrashReasonController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetTrashReasonUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
