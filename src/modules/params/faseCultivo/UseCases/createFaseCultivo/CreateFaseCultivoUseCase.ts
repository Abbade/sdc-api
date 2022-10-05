import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateFaseCultivo {
  name: string;
  description: string;
  ordem: number
}

export class CreateFaseCultivoUseCase {
  
  
  async execute({ name,description, ordem }: ICreateFaseCultivo) {
    const clientExists = await prisma.fasesCultivo.findFirst({
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

    const client = await prisma.fasesCultivo.create({
      data: {
        name,
        description,
        ordem
      },
    });

    return client;
  }
}
