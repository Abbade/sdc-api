import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { ACTION_TYPE } from '../../../../constants/ACTION_TYPE';

interface ICreateLote {
  propDate: Date
  id_propagationType: number;
  id_genetic: number;
  id_location_init: number;
  id_recipiente: number;
  qtTotal: number;
  id_mother?: number;
  obs: string;
  id_user_create: number;
  id_user_atribution: number;
  scheduled: boolean
}

export class CreateLoteUseCase {
  
  
  async execute({ propDate, id_propagationType, id_genetic, id_location_init, id_recipiente, qtTotal,id_mother,obs, id_user_create, id_user_atribution, scheduled }: ICreateLote) {

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

    const setlectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente
      }
    })

    if (!setlectedRecipiente) {
      throw new Error('Recipiente não existente: ' + id_genetic);
    }

    if(id_mother) {
    const selectedMother = await prisma.plantas.findFirst({
      where: {
        id: id_mother
      }
    })

    
    if (!selectedMother) {
      throw new Error('Matriz não existente: ' + id_mother);
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

    const newActionGroup = await (await prisma.actionGroups.create({
      data: {
        id_user_create: id_user_create,
        obs: obs
      }
    })).id

    const newAction = await prisma.actions.create({
      data: {
        id_user_create: id_user_create,
        isLote: true,
        isPlant: false,
        isCrop: false,
        name: "Criação de muda",
        id_actionType: ACTION_TYPE.CREATE_MUDA,
        created_at: new Date(),
        id_user_completion: id_user_atribution,
        id_user_atribution: id_user_atribution,
        scheduledDate: scheduled ? propDate : undefined,

        isCompleted: true,
        completionDate: propDate,
        qtd: qtTotal
      }
    })

    const actionLote = await prisma.actionLotes.create({
      data: {
        id_lote: lote.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        scheduledDate: scheduled ? propDate : undefined,

        id_user_atribution: id_user_atribution,

        id_user_completion: id_user_atribution,
 
        completionDate: propDate,
        id_action: newAction.id,

        qt: qtTotal
      }
    })

    return lote;
  }
}
