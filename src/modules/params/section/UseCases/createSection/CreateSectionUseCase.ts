import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateSection {
  name: string;
  description: string;
}

export class CreateSectionUseCase {
  
  
  async execute({ name,description }: ICreateSection) {
    const clientExists = await prisma.sections.findFirst({
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

    const client = await prisma.sections.create({
      data: {
        name,
        description,
      },
    });

    return client;
  }
}
