import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ILoteFilter {
  name?: string;
  description?: string;
  id: any;

  page: number;
  limit: number;

}

export class GetAllTrashedLotesUseCase {

  async execute({ name, description, page, limit, id }: ILoteFilter) {

    console.log(page);
    console.log(limit);
    
    id = id ? Number.parseInt(id) : undefined

    const total = await prisma.trashedLotes.count({
      where: {
        id: {
          equals: id

        }
        ,


      }
    })
    const lotes = await prisma.trashedLotes.findMany({
      take: (limit * page) ? (limit * page) : 20,
      skip: (page - 1) ? (page - 1) : 0,
      where: {

        id: {
          equals: id
        },


      },
      include: {
        trashReason: true

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
