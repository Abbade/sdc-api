import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ILoteFilter {
  name?: string;
  description?: string;
  page: number;
  limit: number;

}

export class GetAllLotesUseCase {

  async execute({ name, description, page, limit }: ILoteFilter) {

    console.log(page);
    console.log(limit);
    

    const total = await prisma.lotes.count({
      where: {
        name: {
          contains: name
        }
      }
    })
    const lotes = await prisma.lotes.findMany({
      take: (limit * page)?(limit * page):20,
      skip: (page - 1)?(page - 1):0,
      where: {
        name: {
          contains: name
        }
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
