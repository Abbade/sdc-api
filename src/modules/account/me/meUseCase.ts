import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IMe {
  id: number;

}

export class MeUseCase {
  async execute({id}: IMe) {


    const user = await prisma.users.findFirst({
      where: {
        id: {
          equals: id
        }
      },
      select: {
        name: true,
        email: true,
        role: {
          select: {
            name: true,
            permissions: {
              select: {
                code: true
              }
            }
          }
        }
      }
    });

    let perms = user?.role?.permissions?.map((item) => item.code)


    return { name: user?.name, email: user?.email, roles: [user?.role?.name], permissions: perms};
  }
}
