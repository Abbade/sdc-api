import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface IUserFilter {
  description?: string;
  name?: string;
}

export class GeAllUsersUseCase {
  async execute({ description, name }: IUserFilter) {
    const users = await prisma.users.findMany();

    if (!users) {
      throw new Error('Client already exists');
    }


    return users;
  }
}
