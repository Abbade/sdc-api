import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

export interface ICreateFaseCultivo {
  id?: number;
  name: string;
  description: string;
  ordem: number;
  duration?: number | undefined | null;
  id_user_create?: number;
}

export class CreateFaseCultivoUseCase {
  
  
  async execute({ name,description, ordem, id_user_create, duration }: ICreateFaseCultivo) {
    const clientExists = await prisma.fasesCultivo.findFirst({
      where: {
        ordem: {
          equals: ordem
        },
      },
    });

    if (clientExists) {
      throw new Error('Ordem de fase de cultivo já ocupada');
    }

    const client = await prisma.fasesCultivo.create({
      data: {
        name,
        description,
        ordem,
        duration: duration,

        //ajustar crud
        id_tipo_fase_cultivo: 1,

        id_user_create: id_user_create != undefined ? Number.parseInt(id_user_create.toString())  : 0
      },
    });

    return client;
  }
}
