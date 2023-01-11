import { ActionPlants } from '@prisma/client';
import { hash } from 'bcrypt';
import { ACTION_TYPE } from '../../../../constants/ACTION_TYPE';
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
  id_location: number;

  cropFullWetMass:  number;
  cropWetTrimMass: number;
  cropFlowerWetMass:   number;

  obs: string;

}


export class CropPlantUseCase {


  async execute({ actionDate, plants, id_user_create, obs, cropFlowerWetMass, cropFullWetMass, cropWetTrimMass,id_location }: ICropPlant) {

    //VALIDA EXISTENCIA DE CAMPOS


    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants }
      }
    })

    let id_genetic = plantsToUpdate[0].id_genetic
    const selectedGenetic = await prisma.genetics.findFirst({
      where: {
        id: id_genetic
      }
    })

    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {


      if (plant.isTrashed) {
        throw new Error('Não é possivel colher plantas descartadas.')
      }

      if (plant.isCropped) {
        throw new Error('Não é possivel colher plantas já colhidas.')
      }

      if (!plant.floweringDate) {
        throw new Error('Não é possivel colher plantas antes da floração.')
      }


    })


    

    
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        ordem: 5
      }
    })

    if (!selectedFaseCultivo) {
      throw new Error('Fase de Cultivo para log não existente: Colher');
    }

    const selectedFaseCrop = await prisma.fasesCrop.findFirst({
      where: {
        ordem: 3
      }
    })

    if (!selectedFaseCrop) {
      throw new Error('Fase de Crop para log não existente: Colher');
    }

    const cropId = await prisma.crops.count({
      where: {
        id_genetic: id_genetic
      }
    })+1 

    const newCrop = await prisma.crops.create(
      {
        data: {
          name: selectedGenetic?.nick + "#" + cropId,
          cropDate: actionDate,
          id_genetic: id_genetic,
          id_fasesCrop: selectedFaseCrop.id,
          id_user_create: id_user_create,
          id_location: plantsToUpdate[0]?.id_location,
          obs: obs,
          qtPlants: plants.length,
          dryingStartDate: actionDate,
          cropFullWetMass: cropFullWetMass,
          cropFlowerWetMass: cropFlowerWetMass,
          cropWetTrimMass: cropWetTrimMass,
        }
      }
    )

    

      const updatePlantsParams = {
        where: {
          id: { in: plants },
        },
        data: {
          id_faseCultivo: selectedFaseCultivo.id,
          cropDate: actionDate,
          id_crop: newCrop.id,
          cropName: newCrop.name,
          isCropped: true,
          id_location: id_location,
          fullWetMass: cropFullWetMass/plants.length,
          flowersWetMass: cropFlowerWetMass/plants.length,
          wetTrimMass: cropWetTrimMass/plants.length,
          

        }
      }
      const updatedPlants = await prisma.plantas.updateMany(updatePlantsParams)


      let actions = [] as ActionPlants[];

      const newActionGroup = await (
        await prisma.actionGroups.create({
          data: {
            id_user_create: id_user_create,
            obs: obs,
          },
        })
      ).id;
  
      const selectedCropAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Colheita",
          id_actionType: ACTION_TYPE.COLHEITA,
          created_at: new Date(),
          qtd: plantsToUpdate.length,
        },
      });

      const newActionCrop = {
        id_crop: newCrop.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,
  
          status: "Completed",
          isCompleted: true,
          completionDate: actionDate,
  
          id_user_atribution: id_user_create,
          id_action: selectedCropAction.id,
  
          id_location: newCrop.id_location,
  
      }
      const createActionCrop = await prisma.actionCrops.create({
        data: newActionCrop,
      });

      plantsToUpdate.forEach((plant) => {
        const newActionParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,
  
          status: "Completed",
          isCompleted: true,
          completionDate: actionDate,
  
          id_user_atribution: id_user_create,
          id_action: selectedCropAction.id,
  
          id_faseCultivo: selectedFaseCultivo.id,
  
          id_faseCultivo_old:  plant.id_faseCultivo,
        } as ActionPlants;
        actions.push(newActionParams);
      })
      const createActionPlants = await prisma.actionPlants.createMany({
        data: actions,
      });
    return 




  }




}

