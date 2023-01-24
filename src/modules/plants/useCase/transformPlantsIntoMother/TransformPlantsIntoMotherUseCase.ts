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
        throw new Error('Não é possivel transformar plantas descartadas em matrizes.')
      }

      if (plant.cropDate) {
        throw new Error('Não é possivel transformar plantas colhidas em matrizes.')
      }


    })
      
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
        name: "Altera para Planta Matriz",
        id_actionType: ACTION_TYPE.MATRIZ,
        created_at: new Date(),   
        id_user_completion: id_user_create,
        isCompleted: true,
        completionDate: actionDate,
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

          status: "Completed",
          isCompleted: true,
          completionDate: actionDate,
          id_user_completion: id_user_create,
        
          
          id_user_atribution: id_user_create,

      }
      actions.push(newActionParams)



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

