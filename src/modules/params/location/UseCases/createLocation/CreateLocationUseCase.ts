import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateGenetic {
  name: string;
  description: string;
  id_section: number;
}

export class CreateLocationUseCase {
  
  
  async execute({ name,description,id_section }: ICreateGenetic) {
    const clientExists = await prisma.locations.findFirst({
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

    const client = await prisma.locations.create({
      data: {
        name,
        description,
        id_section
      },
    });

    return client;
  }
}
