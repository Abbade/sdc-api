import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { FilterProp } from './GetAllPlantsController';

interface ILoteFilter {
  name?: string;
  description?: string;
  id: any;

  page: number;
  limit: number;

  isTrashed?: boolean;
  isMother?: boolean;

  id_location?: number;
  id_genetic?: number;
  id_recipiente?: number;
  id_faseCultivo?: number;
  filter?: FilterProp;
}

export class GetAllPlantsUseCase {

  async execute({ name, description, page, limit, id, isMother, isTrashed, filter }: ILoteFilter) {

    id = id ? Number.parseInt(id) : undefined

    const total = await prisma.plantas.count({
    
      where: {
        id: {
          equals: id != undefined ?  Number.parseInt(id) : id

        },
        id_lote: {
          equals: filter?.idLote != undefined ?  Number.parseInt(filter?.idLote.toString()) : filter?.idLote

        }
        ,
        id_location: {
          equals: filter?.idLocation != undefined ?  Number.parseInt(filter?.idLocation.toString()) : filter?.idLocation
        },
        id_genetic: {
          equals: filter?.idGenetic != undefined ?  Number.parseInt(filter?.idGenetic.toString()) : filter?.idGenetic
        },
        id_recipiente: {
          equals: filter?.idRecipiente != undefined ?  Number.parseInt(filter?.idRecipiente.toString()) : filter?.idRecipiente 
        },
        id_faseCultivo: {
          equals: filter?.idFaseCultivo != undefined ?  Number.parseInt(filter?.idFaseCultivo.toString()) : filter?.idFaseCultivo  
        },
        propDate: {
          equals: filter?.propagationDate != undefined ?  filter?.propagationDate : filter?.propagationDate  
        },
        aclimatationDate: {
          equals: filter?.aclimatationDate != undefined ?  filter?.aclimatationDate : filter?.aclimatationDate  
        },
        vegetationDate: {
          equals: filter?.vegetationDate != undefined ?  filter?.vegetationDate : filter?.vegetationDate  
        },
        floweringDate: {
          equals: filter?.floweringDate != undefined ?  filter?.floweringDate : filter?.floweringDate  
        },


        name: {
          contains: name
        },
      }
    })
    const lotes = await prisma.plantas.findMany({
      take: limit?.toString() ? Number.parseInt(limit?.toString()):1,
      skip: limit? ((page - 1) * limit):0, 
      where: {
        id: {
          equals: id != undefined ?  Number.parseInt(id) : id

        },
        id_lote: {
          equals: filter?.idLote != undefined ?  Number.parseInt(filter?.idLote.toString()) : filter?.idLote
        },
        id_location: {
          equals: filter?.idLocation != undefined ?  Number.parseInt(filter?.idLocation.toString()) : filter?.idLocation
        },
        id_genetic: {
          equals: filter?.idGenetic != undefined ?  Number.parseInt(filter?.idGenetic.toString()) : filter?.idGenetic
        },
        id_recipiente: {
          equals: filter?.idRecipiente != undefined ?  Number.parseInt(filter?.idRecipiente.toString()) : filter?.idRecipiente 
        },
        id_faseCultivo: {
          equals: filter?.idFaseCultivo != undefined ?  Number.parseInt(filter?.idFaseCultivo.toString()) : filter?.idFaseCultivo  
        },
        isMotherPlant: {
          equals: filter?.isMother  
        },
        isTrashed: {
          equals: filter?.isTrashed  
        },
        name: {
          contains: name
        },
       

      },
      include: {
        location: true,
        genetic: true,
        recipiente: true,
        propagationType: true,
        faseCultivo: true,
        actionPlants: {
          // id ? true:false
        include: {
          action: true
        }
      }

      }
    });

    if (!lotes) {
      throw new Error('Sem Profiles Existentes.');
    }


    return {
      total,
      itens: lotes
    }
      ;
  }
}
