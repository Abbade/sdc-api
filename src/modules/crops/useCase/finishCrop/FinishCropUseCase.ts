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

interface IFinishCrop {
  id_user_create: number;
  actionDate: Date;
  id_crop: number;
  id_location: number;

  cropFullDriedMass: number;
  cropDriedTrimMass: number;
  cropDriedFlowerMass: number;

  qtPacks?: number;
  stock?: {
    seq: number;
    name: string;
    stockFlowerDriedMass: number;
  }[]



  obs: string;

}


export class FinishCropUseCase {


  async execute({ actionDate, id_crop, id_user_create,obs,cropFullDriedMass,cropDriedTrimMass, cropDriedFlowerMass, id_location}: IFinishCrop) {

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location
      }
    })

    if (!selectedLocation) {
      throw new Error('Local não existente');
    }

    const selectedFaseCrop = await prisma.fasesCrop.findFirst({
      where: {
        ordem: 5
      }
    })

    if (!selectedFaseCrop) {
      throw new Error('Fase de Crop para log não existente: Colher');
    }


    const cropToUpdate = await prisma.crops.findFirst({
      where: {
        id: id_crop
      }
    })

    if (!cropToUpdate) {
      throw new Error('Colheita não encontrada.');
    }

    if(cropToUpdate?.cropFlowerWetMass && cropToUpdate?.cropFlowerWetMass <= cropDriedFlowerMass) {
      throw new Error('Massa seca não pode ser maior que massa úmida.');
    }

    if(cropToUpdate?.cropWetTrimMass && cropToUpdate?.cropWetTrimMass <= cropDriedTrimMass) {
      throw new Error('Massa seca não pode ser maior que massa úmida.');
    }

    if(cropToUpdate?.cropFlowerWetMass && cropToUpdate?.cropFlowerWetMass <= cropFullDriedMass) {
      throw new Error('Massa seca não pode ser maior que massa úmida.');
    }
    //VALIDA VIABILIDADE DE 

      if (cropToUpdate?.id_fasesCrop == selectedFaseCrop.id) {
        throw new Error('Não é possivel finalizar uma colheita já finalizada.')
      }




      
    
    const newCrop = await prisma.crops.update(
      {
        where: {
          id: id_crop
        },
        data: {
          dryingEndDate: actionDate,
          id_fasesCrop: selectedFaseCrop.id,
          cropFullDriedMass: cropFullDriedMass,
          cropDriedTrimMass: cropDriedTrimMass,
          cropDriedFlowerMass: cropDriedFlowerMass
        }
      }
    )

    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id_crop: id_crop
      }
    })
    
    plantsToUpdate.forEach(async (plant) => {
     
    const updatedPlants = await prisma.plantas.updateMany({
      where: {
        id: plant.id 
      },
      data: {
flowersDriedMass: cropDriedFlowerMass/plantsToUpdate?.length
      },
    });
  })


    let actions = [] as [];

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
        isCrop: true,
        name: "Finalização de Colheita",
        id_actionType: ACTION_TYPE.FINISH_CROP,
        created_at: new Date(),
        id_user_completion: id_user_create,
        isCompleted: true,
        completionDate: actionDate,
        qtd: 1,
      },
    });

    const newActionCrop = {
      id_crop: cropToUpdate.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        completionDate: actionDate,
        id_user_completion: id_user_create,

        id_user_atribution: id_user_create,
        id_action: selectedCropAction.id,

        id_location: newCrop.id_location,
        id_location_old: cropToUpdate.id_location,

    }
    const createActionCrop = await prisma.actionCrops.create({
      data: newActionCrop,
    });


    }




  }

