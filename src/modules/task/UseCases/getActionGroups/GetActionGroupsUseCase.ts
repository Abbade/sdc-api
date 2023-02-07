import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { FilterProp } from './GetActionGroupsController';
import { getFilterTypeTotal } from '../../../../constants/getFilterTypeTotal';

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
  filterType: string;
}

export class GetActionGroupsUseCase {

  async execute({ name, description, page, limit, id, isMother, isTrashed, filter, filterType }: ILoteFilter) {

    id = id ? Number.parseInt(id) : undefined;

    const { initial, final} = getFilterTypeTotal(filterType);

    console.log(initial);
    console.log(final);
    console.log(new Date(2000,1))


    const total = await prisma.actionGroups.count({
      where: {
        AND: [
          {
            created_at: {
              gte: initial,
              lte : final,
              
            }
          }
        ]
      
      }
    })
    const lotes = await prisma.actionGroups.findMany({
      take: 200,//limit?.toString() ? Number.parseInt(limit?.toString()):1,
      skip: 0,//limit? ((page - 1) * limit):0, 
      // where: {   
      //   AND: [
      //     {
      //       created_at: {
      //         gte : initial,//initial,
      //         lte: new Date(2000,1)
      //       }
      //     }
      //   ] 
      // },
      include: {
        actions: {
          include: {
            actionLotes: true,
            actionCrops: true,
            actionPlants: true
          }
        }
      }
    });

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
