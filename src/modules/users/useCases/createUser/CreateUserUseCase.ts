import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

export interface ICreateUser {
  id?: number;
  email: string;
  password: string;
  name: string;
  id_role?: number;
}

export class CreateUserUseCase {
  async execute({ password, email, name, id_role }: ICreateUser) {
    const clientExists = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          //mode: 'insensitive'
        },
      },
    });

    if (clientExists) {
      throw new Error('Client already exists');
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.users.create({
      data: {
        name,
        email,
        password: hashPassword,
        id_role: id_role
      },
    });

    return client;
  }
}
