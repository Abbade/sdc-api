import { Request, Response } from 'express';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';
import { GetProfileUseCase } from './GetProfileUseCase';

export class GetProfileController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetProfileUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
