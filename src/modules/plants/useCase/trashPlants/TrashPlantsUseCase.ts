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

interface ITrashPlants {
  id_user_create: number;
  trashDate: Date;
  plants: number[];

  id_trashReason: number;
  id_location: number;


  obs: string;

}


export class TrashPlantsUseCase {


  async execute({ trashDate, plants, id_location, id_trashReason, id_user_create,obs }: ITrashPlants) {

    //VALIDA EXISTENCIA DE CAMPOS
  

    // const selectedLocation = await prisma.locations.findFirst({
    //   where: {
    //     id: id_location
    //   }
    // })

    // if (!selectedLocation) {
    //   throw new Error('Local não existente: ' + id_location);
    // }

    const selectedTrashReason = await prisma.trashReasons.findFirst({
      where: {
        id: id_trashReason
      }
    })

    if (!selectedTrashReason) {
      throw new Error('Motivo de descarte não existente: ' + id_trashReason);
    }


    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants }
      }
    })



    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {

      if (plant.trashDate) {
        throw new Error('Planta já foi descartada')
      }

      if (plant.cropDate) {
        throw new Error('Não é possivel descartar plantas colhidas.')
      }


    })

      const updatePlantsParams = {
        where: {
          id: { in: plants },

        },
        data: {
          trashDate: trashDate,
          isTrashed: true,
          id_trashReason: id_trashReason

        }
      }

      const updatedDatePlants = await prisma.plantas.updateMany(updatePlantsParams)
      
      let actions = [] as any;

      const newActionGroup = await (await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs
        }
      })).id

      const selectedAction = await prisma.actions.findFirst({
        where: {
          name: "Descartar planta"
        }
      })
  
      if (!selectedAction) {
        throw new Error('Action para log não existente: Descartar planta');
      }
  
      plantsToUpdate.forEach(plant => {
        const newActionParams = {
            id_planta: plant.id,
            id_user_create: id_user_create,
            obs: obs,
            id_actionGroup: newActionGroup,
            id_action: selectedAction.id,
            status: "Completed",
            isCompleted: true,
            completionDate: trashDate,
            
            id_user_atribution: id_user_create,
  
            id_trashReason: id_trashReason,
  
        }
        actions.push(newActionParams)
  
  
  
      })
      const createActionPlants = await prisma.actionPlants.createMany({data: actions})
      return actions

    }




  }

