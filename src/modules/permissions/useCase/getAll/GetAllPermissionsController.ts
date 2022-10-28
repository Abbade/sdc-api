import { Request, Response } from 'express';
import { IFilter } from '../../../../interfaces/IFilter';
import { GetAllPermissionsUseCase } from './GetAllPermissionsUseCase';

export class GetAllPermissionsController {
  async handle(request: Request, response: Response) {

    const { name, limit,page  } = request.query;
    const item = new GetAllPermissionsUseCase();
    const result = await item.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
      
    });

    return response.json(result);
  }
}
