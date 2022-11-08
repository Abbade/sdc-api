import { prisma } from '../../../../database/prismaClient';

interface ITrashLote {
  id_lote: number;
  aclimatationDate: Date;
  qtPlant: number;
  id_location: number;
  id_recipiente: number;
  obs: string;
  id_user_create: number;
}

interface INewPlant {
  id_lote: number;

  name: string;

  obs: string;

  id_location?: number;
  id_recipiente?: number;

  aclimatationDate: Date;

  //GENERATED ABOVE
  aclimatationName: string;

  id_user_create: number;
  propDate: Date;
  propName: string,
  id_genetic: number,
  id_propagationType: number;

  id_faseCultivo: number;
}

export class CreatePlantsLoteUseCase {


  async execute({ id_lote, aclimatationDate, qtPlant, id_location, id_recipiente, obs, id_user_create }: ITrashLote) {


    if (qtPlant < 0) {
      throw new Error('Quantidade não deve ser negativa: ' + qtPlant);
    }

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedLote = await prisma.lotes.findFirst({
      where: {
        id: id_lote
      }
    })

    if (!selectedLote) {
      throw new Error('Lote não existente: ' + id_lote);
    }

    const selectedGenetic = await prisma.genetics.findFirst({
      where: {
        id: selectedLote.id_genetic
      }
    })

    if (!selectedGenetic) {
      throw new Error('Genética não existente: ' + selectedLote.id);
    }

    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location
      }
    })

    if (!selectedLocation) {
      throw new Error('Local não existente: ' + selectedLote.id);
    }

    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente
      }
    })

    if (!selectedRecipiente) {
      throw new Error('Recipiente não existente: ' + selectedLote.id);
    }



    //VALIDA QUANTIDADE DE ESTACAS/SEEDLINGS
    if (selectedLote?.qtProp - qtPlant < 0) {
      throw new Error('Lote não tem estacas suficiente para transplante.: ' + selectedLote.qtProp);
    }


    let newPlants = [] as any[];




    const plantIndex = selectedLote.qtPlant + 1;

    for (let i = selectedLote.qtPlant + 1; i < plantIndex + qtPlant; i++) {
      newPlants.push({
        name: selectedLote.name + '#' + i,
        id_lote: id_lote,

        id_location: id_location,
        id_recipiente: id_recipiente,

        aclimatationDate: aclimatationDate,
        aclimatationRecipient: selectedRecipiente.name,
        aclimatationLocation: selectedLocation.name,
        lastTransplant: aclimatationDate,


        id_user_create: id_user_create,
        propDate: selectedLote.propDate,
        propName: selectedLote.name,
        id_genetic: selectedLote.id_genetic,
        id_propagationType: selectedLote.id_propagationType,

        id_faseCultivo: 2,
        obs: obs

        //id_mother: selectedLote.id_mother





      })
    }







    const trashedLote = await prisma.plantas.createMany({ data: newPlants })

    const lote = await prisma.lotes.update({
      where: {
        id: id_lote
      },
      data: {
        qtProp: selectedLote.qtProp - qtPlant,
        qtPlant: selectedLote.qtPlant + qtPlant
      }
    })

    return trashedLote;
  }
}
