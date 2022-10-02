import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

export class CreateUserUseCase {
  async execute({ password, email, name }: ICreateUser) {
    const clientExists = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
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
      },
    });

    return client;
  }
}
