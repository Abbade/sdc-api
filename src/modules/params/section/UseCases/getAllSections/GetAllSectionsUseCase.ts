import { prisma } from '../../../../../database/prismaClient';
import { IFilter } from '../../../../../interfaces/IFilter';
export class GetAllSectionsUseCase {
  
  async execute({ name,limit, page }: IFilter) {

    const total = await prisma.sections.count({
      where: {
        name: {
          contains: name
        },

      }
    })

    const itens = await prisma.sections.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ?  (page - 1) * limit : 0,
      where: {
        name: {
          contains: name
        },

      },
      include: {locations: true},
      
    });
    
    if (!
      itens) {
      throw new Error('Sem seção');
    }

    return {
      total,
      itens
    };

  }
}
