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

interface ICropPlant {
  id_user_create: number;
  actionDate: Date;
  plants: number[];



  obs: string;

}


export class CropPlantUseCase {


  async execute({ actionDate, plants, id_user_create, obs }: ICropPlant) {

    //VALIDA EXISTENCIA DE CAMPOS
    let selectedAction = {} as any;

   


    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants }
      }
    })



    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {


      if (plant.isTrashed) {
        throw new Error('Não é possivel alterar plantas descartadas.')
      }

      if (plant.isCropped) {
        throw new Error('Não é possivel alterar plantas colhidas.')
      }


    })


    

    // if (selectedFaseCultivo.name == "Floração") {

    //   selectedAction = await prisma.actions.findFirst({
    //     where: {
    //       name: "Florir planta"
    //     }
    //   })
  
    //   if (!selectedAction) {
    //     throw new Error('Action para log não existente: Mover plantas');
    //   }
    // }

    
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        ordem: 5
      }
    })

    if (!selectedFaseCultivo) {
      throw new Error('Fase de Cultivo para log não existente: Colher');
    }

    // const newCrop = await prisma.crops.create(
    //   {
    //     data: {
    //       name: selectedLote.name + "#" + i,
    //       id_user_create: id_user_create,
    //       obs: obs,
    //     }
    //   }
    // )

    

      const updatePlantsParams = {
        where: {
          id: { in: plants },
        },
        data: {
          id_faseCultivo: selectedFaseCultivo.id,
          cropDate: actionDate,

        }
      }
      const updatedPlants = await prisma.plantas.updateMany(updatePlantsParams)



    // let actions = [] as any;

    // const newActionGroup = await (await prisma.actionGroups.create({
    //   data: {
    //     id_user_create: id_user_create,
    //     obs: obs
    //   }
    // })).id

    

    // plantsToUpdate.forEach(plant => {
    //   const newActionParams = {
    //       id_planta: plant.id,
    //       id_user_create: id_user_create,
    //       obs: obs,
    //       id_actionGroup: newActionGroup,
    //       id_action: selectedAction.id,
    //       status: "Completed",
    //       isCompleted: true,
    //       completionDate: actionDate,
          
    //       id_user_atribution: id_user_create,

    //       id_faseCultivo: id_faseCultivo,

    //       id_faseCultivo_old: id_faseCultivo ? plant.id_faseCultivo : undefined,
    //   }
    //   actions.push(newActionParams)



    // })
    // const createActionPlants = await prisma.actionPlants.createMany({data: actions})
    return 




  }




}

