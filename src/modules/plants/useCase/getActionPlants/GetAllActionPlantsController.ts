
import { Request, Response } from 'express';
import { GetAllActionPlantsUseCase } from './GetAllActionPlantsUseCase';

export type FilterProp = {
  totalFilter: number;
  idLote?: number;
  idGenetic?: number;
  idRecipiente?: number;
  idFaseCultivo?: number;
  idLocation?: number;
}

export class GetAllActionPlantsController {
  async handle(request: Request, response: Response) {
    const { id, name, page, limit, isTrashed, isMother, filter } = request.query as any

    let filterValue = filter as FilterProp;
    console.log(filterValue);
    const getAllActionPlantsUseCase = new GetAllActionPlantsUseCase();
    const result = await getAllActionPlantsUseCase.execute({
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
