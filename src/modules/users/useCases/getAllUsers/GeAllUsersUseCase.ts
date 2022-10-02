import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface IUserFilter {
  email?: string;
  name?: string;
}

export class GeAllUsersUseCase {
  async execute({ email, name }: IUserFilter) {
    const users = await prisma.users.findMany();

    if (!users) {
      throw new Error('Client already exists');
    }


    return users;
  }
}
