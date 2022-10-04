import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateGenetic {
  name: string;
  nick: string;
  description: string;
  id_profile: number;
}

export class CreateGeneticUseCase {
  
  
  async execute({ name, nick,description, id_profile }: ICreateGenetic) {
    const clientExists = await prisma.genetics.findFirst({
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

    const client = await prisma.genetics.create({
      data: {
        name,
        nick,
        description,
        id_profile
      },
    });

    return client;
  }
}
