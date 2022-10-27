import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ILoteFilter {
  name?: string;
  description?: string;
  id: any;

  page: number;
  limit: number;

}

export class GetAllLotesUseCase {

  async execute({ name, description, page, limit, id }: ILoteFilter) {

    page = page == 0 ? 1 : page;
    id = id ? Number.parseInt(id) : undefined

    const total = await prisma.lotes.count({
      where: {
        id: {
          equals: id

        }
        ,
        name: {
          contains: name
        },

      }
    })
    const lotes = await prisma.lotes.findMany({
      take: Number.parseInt(limit.toString()),
      skip: (page - 1) * limit,
      where: {

        id: {
          equals: id
        },
        name: {
          contains: name
        },

      },
      include: {
        location: true,
        genetic: true,
        propagationType: true

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
