import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';
import { IFilter } from '../../../../../interfaces/IFilter';


export class GetAllProfilesUseCase {
  
  async execute({ name, limit,page }: IFilter) {
    const total = await prisma.profiles.count({
      where: {
        name: {
          contains: name
        },

      }
    })

    const itens = await prisma.profiles.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ?  (page - 1) * limit : 0,
      where: {
        name: {
          contains: name
        },

      },
      
    });
    
    if (!
      itens) {
      throw new Error('Sem perfil genético');
    }

    return {
      total,
      itens
    };
  }
}
