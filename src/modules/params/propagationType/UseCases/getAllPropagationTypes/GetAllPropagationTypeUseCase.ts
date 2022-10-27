import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';
import { IFilter } from '../../../../../interfaces/IFilter';

interface IPropagationTypeFilter {
  name: string;
  description: string;

}

export class GetAllPropagationTypeUseCase {
  
  async execute({ name, limit,page }: IFilter) {
    const total = await prisma.propagationType.count({
      where: {
        name: {
          contains: name
        },

      }
    })
    const itens = await prisma.propagationType.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ?  (page - 1) * limit : 0,
      where: {
        name: {
          contains: name
        },

      }
    });
    console.log(itens);
    if (!itens) {
      throw new Error('Sem tipo de Propagações.');
    }


    return {
      total,
      itens
    };
  }
}
