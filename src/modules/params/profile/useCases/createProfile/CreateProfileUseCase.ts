import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateProfile {
  name: string;
  description: string;
  id_user_create: number;

}

export class CreateProfileUseCase {
  
  
  async execute({ name, description,id_user_create }: ICreateProfile) {
    const clientExists = await prisma.profiles.findFirst({
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

    const client = await prisma.profiles.create({
      data: {
        name,
        description,
        id_user_create
      },
    });

    return client;
  }
}
