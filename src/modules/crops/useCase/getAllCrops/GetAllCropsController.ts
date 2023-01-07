import { Request, Response } from 'express';
import { GetAllCropsUseCase } from './GetAllCropsUseCase';

export type FilterProp = {
  totalFilter: number;
  idLote?: number;
  ids?: string;
  idGenetic?: number;
  idRecipiente?: number;
  idFaseCultivo?: number;
  idLocation?: number;
  isMother?: boolean;
  isTrashed?: boolean;
  propagationDate?: Date;
  aclimatationDate?: Date;
  vegetationDate?: Date;
  floweringDate?: Date;
}

export class GetAllCropsController {
  async handle(request: Request, response: Response) {
    const { id, name, page, limit, isTrashed, isMother, filter } = request.query as any

    let filterValue = filter as FilterProp;
    console.log(filterValue);
    const getAllPlantsUseCase = new GetAllCropsUseCase();
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
