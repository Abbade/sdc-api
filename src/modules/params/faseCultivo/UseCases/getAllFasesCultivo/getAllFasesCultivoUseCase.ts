import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';
import { IFilter } from '../../../../../interfaces/IFilter';


export class GetAllFasesCultivoUseCase {
  
  async execute({ name,limit, page }: IFilter) {
    const total = await prisma.fasesCultivo.count({
      where: {
        name: {
          contains: name
        },
      }
    })
    const itens = await prisma.fasesCultivo.findMany({
      take: Number.parseInt(limit.toString()),
      skip: (page - 1) * limit,
      where: {
        name: {
          contains: name
        },

      }
    });

    if (!itens) {
      throw new Error('Sem Fases de Cultivo Existentes.');
    }


    return {
      total,
      itens
    };
  }
}
