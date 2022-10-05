import { Request, Response } from 'express';
import { TrashLoteUseCase } from './TrashLoteUseCase';

export class TrashLoteController {
  async handle(request: Request, response: Response) {
    const { idLote, qtTrash, trashDate, id_trashReason} = request.body;

    const trashLoteUseCase = new TrashLoteUseCase();
    const result = await trashLoteUseCase.execute({
      idLote,
      id_trashReason,
      qtTrash,
      trashDate,
    });

    return response.json(result);
  }
}
