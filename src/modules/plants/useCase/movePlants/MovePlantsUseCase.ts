import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

const postmanJson = {
  "transplantDate": "2012-04-30T18:25:43.511Z",
  "plants": [1, 2, 3, 4],
  "id_recipiente": 1,
  "id_location": 1,
  "id_faseCultivo": 2,


  "obs": "Ae"
  }

interface IMovePlants {
  id_user_create: number;
  moveDate: Date;
  plants: number[];

  id_location: number;


  obs: string;

}


export class MovePlantsUseCase {


  async execute({ moveDate, plants, id_location, id_user_create,obs }: IMovePlants) {

    //VALIDA EXISTENCIA DE CAMPOS
  

    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location
      }
    })

    if (!selectedLocation) {
      throw new Error('Local não existente: ' + id_location);
    }


    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants }
      }
    })



    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {

      if (plant.id_location === id_location) {
        throw new Error('Planta já está no local')
      }

      if (plant.trashDate) {
        throw new Error('Não é possivel mover plantas descartadas.')
      }

      if (plant.cropDate) {
        throw new Error('Não é possivel mover plantas colhidas.')
      }


    })

      const updatePlantsParams = {
        where: {
          id: { in: plants },

        },
        data: {
          id_location: id_location,

        }
      }

      const updatedDatePlants = await prisma.plantas.updateMany(updatePlantsParams)
      

    }




  }

