import { Request, Response } from 'express';
import { TrashLoteUseCase } from './TrashLoteUseCase';

export class TrashLoteController {
  async handle(request: Request, response: Response) {
    const { idLote, qtTrash, trashDate, id_trashReason, obs} = request.body;

    const trashLoteUseCase = new TrashLoteUseCase();
    const result = await trashLoteUseCase.execute({
      idLote,
      id_trashReason,
      qtTrash,
      trashDate,
      obs
    });

    return response.json(result);
  }
}
