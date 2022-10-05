import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateSection {
  name: string;
  description: string;
  id_user_create: number;
}

export class CreateTrashReasonUseCase {
  
  
  async execute({ name,description,id_user_create }: ICreateSection) {
    const clientExists = await prisma.trashReasons.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        },
      },
    });

    if (clientExists) {
      throw new Error('Client already exists');
    }

    const client = await prisma.trashReasons.create({
      data: {
        name,
        description,
        id_user_create
      },
    });

    return client;
  }
}
