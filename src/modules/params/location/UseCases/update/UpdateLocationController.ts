import { Request, Response } from 'express';
import { UpdateLocationUseCase } from './UpdateLocationUseCase';

export class UpdateLocationController {
  async handle(request: Request, response: Response) {
    const {name,description,id_section, id_faseCultivo, id} = request.body;
    const id_user_create = request.id_user
    const createSectionUseCase = new UpdateLocationUseCase();
    const result = await createSectionUseCase.execute({
      id,
      name,
      description,
      id_section,
      id_faseCultivo,
      id_user_create
    });

    return response.json(result);
  }
}
