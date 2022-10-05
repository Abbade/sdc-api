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


    // INICIA CRIAÇÃO DE CODIGO UNICO 
    const geneticName = await prisma.genetics.findFirst({
      where: {
        id: id_genetic
      }
    })

    const date = new Date(propDate).toLocaleDateString('pt-BR').replaceAll("/","");

    const newName1 = geneticName?.nick + "#" + date ;

    const lotesEncontrados = await prisma.lotes.findMany({
      where: {
        name: {
          contains: newName1,
          mode: 'insensitive'
        },
      },
    });


    const newName2 = newName1 + "-" +
    
    String.fromCharCode("A".charCodeAt(0) + lotesEncontrados?.length );
    
    
    // FINALIZA CRIAÇÃO DE CÓDIGO ÚNICO

    const clientExists = await prisma.lotes.findFirst({
      where: {
        name: {
          equals: newName2,
          mode: 'insensitive'
        },
      },
    });

    if (clientExists) {
      throw new Error('Client already exists: ' + newName2);
    }

    const lote = await prisma.lotes.create({
      data: {
        name: newName2,

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
