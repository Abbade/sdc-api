import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { ACTION_TYPE } from '../../../../constants/ACTION_TYPE';

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
id_user_atribution: number;
scheduled: boolean;

  obs: string;

}


export class MovePlantsUseCase {


  async execute({ moveDate, plants, id_location, id_user_create,obs, scheduled, id_user_atribution }: IMovePlants) {

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
    if(!scheduled) {
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
      let actions = [] as any;

      const newActionGroup = await (await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs
        }
      })).id
  
   

      const selectedAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: true,
          isCrop: false,
          name: "Mover plantas",
          //status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : moveDate,    
          id_user_completion: scheduled ? undefined: id_user_create,
        
          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          id_actionType: ACTION_TYPE.ALTERA_LOCAL,
          created_at: new Date(),
        
          qtd: plantsToUpdate.length
        }
      })

      
  
      if (!selectedAction) {
        throw new Error('Action para log não existente: Mover plantas');
      }

      plantsToUpdate.forEach(plant => {
        const newActionParams = {
            id_planta: plant.id,
            id_user_create: id_user_create,
            obs: obs,
            id_action: selectedAction.id,
            id_actionGroup: newActionGroup,
  
            status: scheduled ? "Agendada" : "Completed",
            isCompleted: scheduled ? false : true,
            completionDate: scheduled ? undefined : moveDate,    
            id_user_completion: scheduled ? undefined: id_user_create,
          
            id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
  
            id_location: id_location,
  
            id_location_old: id_location ? plant.id_location : undefined
        }
        actions.push(newActionParams)
  
  
  
      })
      const createActionPlants = await prisma.actionPlants.createMany({data: actions})
      return actions
    }


    

  }

