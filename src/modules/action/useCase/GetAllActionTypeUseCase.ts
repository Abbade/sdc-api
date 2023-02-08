import { prisma } from '../../../database/prismaClient';
import { IFilter } from '../../../interfaces/IFilter';

export class GetAllActionTypeUseCase {
  
  async execute({ name, limit,page }: IFilter) {
    const total = await prisma.actionTypes.count({
      where: {
        name: {
          contains: name
        },

      }
    })

    const itens = await prisma.actionTypes.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ?  (page - 1) * limit : 0,
      where: {
        name: {
          contains: name
        },

      }
      
    });
    
    if (!
      itens) {
      throw new Error('Cannot find action type');
    }

    return {
      total,
      itens
    };
  }
}
