import { Request, Response } from 'express';
import { GetAllSectionsUseCase } from './GetAllSectionsUseCase';

export class GetAllSectionsController {
  async handle(request: Request, response: Response) {
    const { name,limit, page } = request.query;

    const getAllSectionsUseCase = new GetAllSectionsUseCase();
    const result = await getAllSectionsUseCase.execute({
      name : name?.toString(),
      limit : Number.parseInt(limit?.toString() as string),
      page : Number.parseInt(page?.toString() as string)
    });

    return response.json(result);
  }
}
