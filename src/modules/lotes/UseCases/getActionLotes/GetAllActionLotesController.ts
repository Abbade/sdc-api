
import { Request, Response } from 'express';
import { GetAllActionLotesUseCase } from './GetAllActionLotesUseCase';

export type FilterProp = {
  totalFilter: number;
  idLote?: number;
  idGenetic?: number;
  idRecipiente?: number;
  idFaseCultivo?: number;
  idLocation?: number;
}

export class GetAllActionLotesController {
  async handle(request: Request, response: Response) {
    const { id, name, page, limit, isTrashed, isMother, filter } = request.query as any

    let filterValue = filter as FilterProp;
    console.log(filterValue);
    const getAllActionLotesUseCase = new GetAllActionLotesUseCase();
    const result = await getAllActionLotesUseCase.execute({
      id,
      name,
      page,
      limit,
      isTrashed,
      isMother,
      filter : filterValue
    });
    return response.json(result);
  }
}
