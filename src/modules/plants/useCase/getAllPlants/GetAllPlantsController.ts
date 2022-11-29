import { Request, Response } from 'express';
import { GetAllPlantsUseCase } from './GetAllPlantsUseCase';

export type FilterProp = {
  totalFilter: number;
  idLote?: number;
  idGenetic?: number;
  idRecipiente?: number;
  idFaseCultivo?: number;
  idLocation?: number;
  isMother?: boolean;
  isTrashed?: boolean;
}

export class GetAllPlantsController {
  async handle(request: Request, response: Response) {
    const { id, name, page, limit, isTrashed, isMother, filter } = request.query as any

    let filterValue = filter as FilterProp;
    console.log(filterValue);
    const getAllPlantsUseCase = new GetAllPlantsUseCase();
    const result = await getAllPlantsUseCase.execute({
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
