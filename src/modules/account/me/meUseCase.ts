import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IMe {
  id: string;

}

export class MeUseCase {
  async execute({id}: IMe) {


    const user = await prisma.users.findFirst({
      where: {
        id: {
          equals: parseInt(id)
        }
      },
    });




    return { email: user?.email, roles: ["administrador"], permissions: ["lote.list", "lote.create"] };
  }
}
