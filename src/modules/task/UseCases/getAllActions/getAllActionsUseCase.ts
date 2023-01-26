import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { IFilter } from '../../../../interfaces/IFilter';

interface IActionsFilter {
  name?: string;
  description?: string;
  id?: any;
  selectedPlant?: number;
  page: number;
  limit: number;


}

export class GetAllFasesCultivoUseCase {

  async execute({ id, limit, page }: IActionsFilter) {
    const total = await prisma.actions.count({
      where: {
        id
          
      } 
      
    })
    const itens = await prisma.actions.findMany(
      {
        take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
        skip: !isNaN(page) ? (page - 1) * limit : 0,
        where: {
          id: id

        },
       
        include: {
          actionPlants: id ? true: false, 
          actionLotes: id ? true: false,
        }
      }
    );

    if (!itens) {
      throw new Error('Sem Fases de Cultivo Existentes.');
    }


    return {
      total,
      itens
    };
  }
}
