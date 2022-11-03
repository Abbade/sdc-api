import { Request, Response } from 'express';
import { IRetrieve } from '../../../../interfaces/IRetrieve';
import { GetCompanyUseCase } from './GetCompanyUseCase';

export class GetCompanyController {

  async handle(request: Request, response: Response) {

    const { id } = request.params;

    const get = new GetCompanyUseCase();
    const result = await get.execute({id : Number.parseInt(id?.toString() as string)} as IRetrieve);

    return response.json(result);
  }
}
