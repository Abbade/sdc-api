import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';
import { IFilter } from '../../../../../interfaces/IFilter';


export class GetAllFasesCultivoUseCase {

  async execute({ name, limit, page }: IFilter) {
    const total = await prisma.fasesCultivo.count({
      where: {
        name: {
          contains: name
        },
      }
    })
    const itens = await prisma.fasesCultivo.findMany(
      {
        take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
        skip: !isNaN(page) ? (page - 1) * limit : 0,
        where: {
          name: {
            contains: name
          },

        },
        orderBy: {
          ordem: 'asc'
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
