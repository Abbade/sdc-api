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
      include: {
        role: {
          include: {
            permissions: true
          }
        }
      }
    });




    return { name: user?.name, email: user?.email, roles: [user?.role], permissions: user?.role?.permissions };
  }
}
