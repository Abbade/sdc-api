import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';
import { IFilter } from '../../../../../interfaces/IFilter';

interface IGeneticFilter {
  name: string;
  description: string;

}

export class GetAllGeneticsUseCase {
  
  async execute({ name, limit,page }: IFilter) {

    const total = await prisma.genetics.count({
      where: {
        name: {
          contains: name
        },

      }
    })

    const itens = await prisma.genetics.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ?  (page - 1) * limit : 0,
      where: {
        name: {
          contains: name
        },

      },
      include: {profile: true},
      
    });
    
    if (!
      itens) {
      throw new Error('Sem Geneticas');
    }

    return {
      total,
      itens
    };
  }
}
