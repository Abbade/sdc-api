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
  actionDate: Date;
  plants: number[];



  obs: string;

}


export class TransformPlantsIntoMotherUseCase {


  async execute({ actionDate, plants, id_user_create,obs }: IMovePlants) {

    //VALIDA EXISTENCIA DE CAMPOS
  


    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants }
      }
    })



    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {

      // if (plant.isMalePlant) {
      //   throw new Error('Não é possivel transformar plantas macho em matrizes.')
      // }
      
      // if (plant.isMotherPlant) {
      //   throw new Error('Não é possivel transformar matrizes em matrizes.')
      // }

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
          isMotherPlant: true,

        }
      }

      const updatedDatePlants = await prisma.plantas.updateMany(updatePlantsParams)
      

    }




  }

