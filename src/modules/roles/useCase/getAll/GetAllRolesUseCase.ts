import { prisma } from '../../../../database/prismaClient';
import { IFilter } from '../../../../interfaces/IFilter';

export class GetAllRolesUseCase {
  
  async execute({ name, limit,page }: IFilter) {
    const total = await prisma.roles.count({
      where: {
        name: {
          contains: name
        },

      }
    })

    const itens = await prisma.roles.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ?  (page - 1) * limit : 0,
      where: {
        name: {
          contains: name
        },

      },
      include: {
        permissions: true
      }
      
    });
    
    if (!
      itens) {
      throw new Error('Sem Perfis');
    }

    return {
      total,
      itens
    };
  }
}
