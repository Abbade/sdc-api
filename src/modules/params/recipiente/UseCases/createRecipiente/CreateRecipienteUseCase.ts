import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateRecipiente {
  name: string;
  description: string;
  id_user_create: number;
}

export class CreateRecipienteUseCase {
  
  
  async execute({ name,description,id_user_create }: ICreateRecipiente) {
    const clientExists = await prisma.recipientes.findFirst({
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

    const client = await prisma.recipientes.create({
      data: {
        name,
        description,
        id_user_create
      },
    });

    return client;
  }
}
