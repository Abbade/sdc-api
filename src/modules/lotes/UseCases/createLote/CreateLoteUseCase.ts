import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ICreateLote {
  propDate: Date
  id_propagationType: number;
  id_genetic: number;
  id_location_init: number;
  qtTotal: number;
  obs: string;
}

export class CreateLoteUseCase {
  
  
  async execute({ propDate, id_propagationType, id_genetic, id_location_init, qtTotal,obs }: ICreateLote) {

    const geneticName = await prisma.genetics.findFirst({
      where: {
        id: id_genetic
      }
    })

    const date = new Date(propDate).toLocaleDateString('pt-BR').replaceAll("/","");

    const newName = geneticName?.nick + "#" + date + "-A";

    const clientExists = await prisma.lotes.findFirst({
      where: {
        name: {
          equals: newName,
          mode: 'insensitive'
        },
      },
    });

    if (clientExists) {
      throw new Error('Client already exists: ' + newName);
    }

    const lote = await prisma.lotes.create({
      data: {
        name: newName,

        propDate,

        id_propagationType,
        id_genetic,
        id_location_init,
        
        qtTotal,
        qtProp: qtTotal,
        obs,

      },
    });

    return lote;
  }
}
