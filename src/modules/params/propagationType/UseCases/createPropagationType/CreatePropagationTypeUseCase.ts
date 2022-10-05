import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreatePropagationType {
  name: string;
  description: string;
  id_user_create: number;

}

export class CreatePropagationTypeUseCase {
  
  
  async execute({ name,description,id_user_create }: ICreatePropagationType) {
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
        id_user_create
      },
    });

    return propagationType;
  }
}
