import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

export interface ICreateGenetic {
  id?: number;
  name: string;
  description: string;
  id_section: number;
  id_faseCultivo: number;
  id_user_create: number;

}

export class CreateLocationUseCase {
  
  
async execute({ name,description,id_section,id_user_create, id_faseCultivo}: ICreateGenetic) {

  const selectedSection = await prisma.sections.findFirst({
    where: {
      id: id_section
    }
  })
  
  if (!selectedSection) {
    throw new Error('Perfil de genética não existente: ' + id_section);
  }

  const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
    where: {
      id: id_faseCultivo
    }
  })
  
  if (!selectedFaseCultivo) {
    throw new Error('Fase de cultivo não existente: ' + id_faseCultivo);
  }


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
        id_section,
        id_user_create
      },
    });

    return client;
  }
}
