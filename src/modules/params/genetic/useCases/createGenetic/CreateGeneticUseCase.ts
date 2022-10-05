import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreateGenetic {
  name: string;
  nick: string;
  description: string;
  id_profile: number;
  id_user_create: number;

}

export class CreateGeneticUseCase {
  

  
  async execute({ name, nick,description, id_profile, id_user_create }: ICreateGenetic) {

   //VALIDA EXISTENCIA DE CAMPOS
   const selectedProfile = await prisma.profiles.findFirst({
    where: {
      id: id_profile
    }
  })
  
  if (!selectedProfile) {
    throw new Error('Perfil de genética não existente: ' + id_profile);
  }

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
        id_profile,
        id_user_create
      },
    });

    return client;
  }
}
