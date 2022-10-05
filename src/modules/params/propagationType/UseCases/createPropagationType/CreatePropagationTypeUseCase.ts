import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreatePropagationType {
  name: string;
  description: string;
}

export class CreatePropagationTypeUseCase {
  
  
  async execute({ name,description }: ICreatePropagationType) {
    const clientExists = await prisma.propagationType.findFirst({
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

    const propagationType = await prisma.propagationType.create({
      data: {
        name,
        description,
      },
    });

    return propagationType;
  }
}
