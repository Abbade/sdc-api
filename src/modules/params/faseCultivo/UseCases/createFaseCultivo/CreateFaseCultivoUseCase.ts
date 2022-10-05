import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateFaseCultivo {
  name: string;
  description: string;
  ordem: number;
  id_user_create: number;
}

export class CreateFaseCultivoUseCase {
  
  
  async execute({ name,description, ordem, id_user_create }: ICreateFaseCultivo) {
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
        ordem,
        id_user_create
      },
    });

    return client;
  }
}
