import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ILoteFilter {
  name?: string;
  description?: string;
  id: any;

  page: number;
  limit: number;

}

export class GetAllPlantsUseCase {

  async execute({ name, description, page, limit, id }: ILoteFilter) {

    console.log(page);
    console.log(limit);
    
    id = id ? Number.parseInt(id) : undefined

    const total = await prisma.plantas.count({
    
      where: {
        id_lote: {
          equals: id

        }
        ,

        name: {
          contains: name
        },
      }
    })
    const lotes = await prisma.plantas.findMany({
      take: Number.parseInt(limit.toString()),
      skip: (page - 1) * limit,
      where: {

        id_lote: {
          equals: id
        },
        name: {
          contains: name
        },

      },
      include: {
        location: true,
        genetic: true,
        recipiente: true,
        propagationType: true,
        faseCultivo: true

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
