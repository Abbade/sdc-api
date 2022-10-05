import { Request, Response } from 'express';
import { GetAllSectionsUseCase } from './GetAllSectionsUseCase';

export class GetAllSectionsController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const getAllSectionsUseCase = new GetAllSectionsUseCase();
    const result = await getAllSectionsUseCase.execute({
      name,
      description,
      
    });

    return response.json(result);
  }
}
