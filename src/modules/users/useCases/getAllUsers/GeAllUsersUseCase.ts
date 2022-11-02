import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { IFilter } from '../../../../interfaces/IFilter';

interface IUserFilter {
  description?: string;
  name?: string;
}

export class GeAllUsersUseCase {
  async execute({ name, limit, page }: IFilter) {

    const total = await prisma.users.count({
      where: {
        name: {
          contains: name
        },

      }
    })
    
    const users = await prisma.users.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ?  (page - 1) * limit : 0,
      where: {
        name: {
          contains: name
        },

      },
    });

    return {
      total,
      itens: users
    };
  }
}
