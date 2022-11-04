import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ICreateLote {
  propDate: Date
  id_propagationType: number;
  id_genetic: number;
  id_location_init: number;
  qtTotal: number;
  id_mother?: number;
  obs: string;
  id_user_create: number;
}

export class CreateLoteUseCase {
  
  
  async execute({ propDate, id_propagationType, id_genetic, id_location_init, qtTotal,id_mother,obs, id_user_create }: ICreateLote) {

    //VALIDA CAMPOS

    if (qtTotal <= 0) {
      throw new Error('Quantidade deve ser maior que 0.');
    }

    const selectedGenetic = await prisma.genetics.findFirst({
      where: {
        id: id_genetic
      }
    })

    if (!selectedGenetic) {
      throw new Error('Genética não existente: ' + id_genetic);
    }

    if(id_mother) {
    const selectedMother = await prisma.plantas.findFirst({
      where: {
        id: id_mother
      }
    })

    
    if (!selectedMother) {
      throw new Error('Matriz não existente: ' + id_genetic);
    }


  }


    const selectedPropagationType = await prisma.propagationType.findFirst({
      where: {
        id: id_propagationType
      }
    })

    if (!selectedPropagationType) {
      throw new Error('Modo de propagação não existente: ' + id_propagationType);
    }

    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location_init
      }
    })

    if (!selectedLocation) {
      throw new Error('Local não existente: ' + id_genetic);
    }


    // INICIA CRIAÇÃO DE CODIGO UNICO 


    const date = new Date(propDate).toLocaleDateString('pt-BR').replaceAll("/","");

    const newName1 = selectedGenetic?.nick + "#" + date ;

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
        id_user_create,
        propDate,

        id_propagationType,
        id_genetic,
        id_location_init,
        // id_mother,
        qtTotal,
        qtProp: qtTotal,
        obs,

      },
    });

    return lote;
  }
}
