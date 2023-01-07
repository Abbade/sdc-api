import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { FilterProp } from './GetAllCropsController';

interface ILoteFilter {
  name?: string;
  description?: string;
  id: any;

  page: number;
  limit: number;

  isTrashed?: boolean;
  isMother?: boolean;

  id_location?: number;
  id_genetic?: number;
  id_recipiente?: number;
  id_faseCultivo?: number;
  filter?: FilterProp;
}

export class GetAllCropsUseCase {

  async execute({ name, description, page, limit, id, isMother, isTrashed, filter }: ILoteFilter) {

    id = id ? Number.parseInt(id) : undefined

    let ids = filter?.ids?.split("\n").map(ids => {return ids.trim()})

    const total = await prisma.crops.count(
    
      )
    const lotes = await prisma.crops.findMany({
      take: limit?.toString() ? Number.parseInt(limit?.toString()):1,
      skip: limit? ((page - 1) * limit):0, 
     
      include: {
        location: true,
        genetics: true,
        fasesCrop: true
        
      }

      }
    );

    if (!lotes) {
      throw new Error('Sem Profiles Existentes.');
    }


    return {
      total,
      itens: lotes
    }
      ;
  }
}
