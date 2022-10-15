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

interface ITransplantPlants {
  id_user_create: number;
  transplantDate: Date;
  plants: number[];

  id_recipiente: number;
  id_location: number;
  id_faseCultivo: number;


  obs: string;

}

interface ITransplantUpdate {

}

export class TransplantPlantsUseCase {


  async execute({ transplantDate, plants, id_recipiente, id_location, id_faseCultivo, id_user_create, obs }: ITransplantPlants) {

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        id: id_faseCultivo
      }
    })

    if (!selectedFaseCultivo) {
      throw new Error('Fase de cultivo não existente: ' + id_faseCultivo);
    }

    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location
      }
    })

    if (!selectedLocation) {
      throw new Error('Local não existente: ' + id_location);
    }

    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente
      }
    })

    if (!selectedRecipiente) {
      throw new Error('Recipiente não existente: ' + id_recipiente);
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
        throw new Error('Não é possivel transplantar plantas descartadas.')
      }

      if (plant.cropDate) {
        throw new Error('Não é possivel transplantar plantas colhidas.')
      }

      if (plant.id_recipiente == selectedRecipiente.id ) {
        throw new Error('Não é possivel transplantar planta para um mesmo recipiente.')
      }

      if(plant.lastTransplant && plant.lastTransplant > transplantDate) {
        throw new Error('Não é possivel transplantar plantas em uma data anterior a ultimo transplante.')
        
      }

      if(plant.id_faseCultivo > selectedFaseCultivo.id) {
        throw new Error('Não é possivel voltar com plantas para fase anterior.')
        
      }




    })

    // ACLIMATAÇÃO
    if (selectedFaseCultivo.id == 2) {



      var param = {
        where: {
          id: { in: plants }
        },
        data: {
          id_faseCultivo: id_faseCultivo,
          id_recipiente: id_recipiente,
          id_location: id_location,

          lastTransplant: transplantDate,

          

        }
      }
      const updatedPlants = await prisma.plantas.updateMany(param)


      const plantsWithEmptyDate = plantsToUpdate.filter(plant => {
        return !plant.aclimatationDate
      }).map(plant => {
        return plant.id
      })

      const updateDateParams = {
        where: {
          id: { in: plantsWithEmptyDate },

        },
        data: {
          aclimatationDate: transplantDate,
          aclimatationLocation: selectedLocation.name,
          aclimatationRecipient: selectedRecipiente.name,

        }
      }

      const updatedDatePlants = await prisma.plantas.updateMany(updateDateParams)


    }

    // VEGETAÇÃO
    if (selectedFaseCultivo.id == 3) {
      const param = {
        where: {
          id: { in: plants }
        },
        data: {
          id_faseCultivo: id_faseCultivo,
          id_recipiente: id_recipiente,
          id_location: id_location,
          lastTransplant: transplantDate

        }
      }
      const updatedPlants = await prisma.plantas.updateMany(param)

      const plantsWithEmptyDateV1 = plantsToUpdate.filter(plant => {
        return !plant.vegetationDate
      }).map(plant => {
        return plant.id
      })


      const updateDateParamsV1 = {
        where: {
          id: { in: plantsWithEmptyDateV1 },

        },
        data: {
          vegetationDate: transplantDate,
          vegetationRecipient: selectedRecipiente.name,
          vegetationLocation: selectedLocation.name

        }
      }

      const updatedDatePlantsV1 = await prisma.plantas.updateMany(updateDateParamsV1)

      const plantsWithEmptyDateV2 = plantsToUpdate.filter(plant => {
        return plant.vegetationDate && !plant.vegetation2Date
      }).map(plant => {
        return plant.id
      })


      const updateDateParamsV2 = {
        where: {
          id: { in: plantsWithEmptyDateV2 },

        },
        data: {
          vegetation2Date: transplantDate,
          vegetation2Recipient: selectedRecipiente.name,
          vegetation2Location: selectedLocation.name

        }
      }

      const updatedDatePlantsV2 = await prisma.plantas.updateMany(updateDateParamsV2)

      const plantsWithEmptyDateV3 = plantsToUpdate.filter(plant => {
        return plant.vegetationDate && plant.vegetation2Date && !plant.vegetation3Date
      }).map(plant => {
        return plant.id
      })


      const updateDateParamsV3 = {
        where: {
          id: { in: plantsWithEmptyDateV3 },

        },
        data: {
          vegetation3Date: transplantDate,
          vegetation3Recipient: selectedRecipiente.name,
          vegetation3Location: selectedLocation.name

        }
      }

      const updatedDatePlantsV3 = await prisma.plantas.updateMany(updateDateParamsV3)




    }

    // FLORACAO
    if (selectedFaseCultivo.id == 4) {
      const param = {
        where: {
          id: { in: plants }
        },
        data: {
          id_faseCultivo: id_faseCultivo,
          id_recipiente: id_recipiente,
          id_location: id_location,
          lastTransplant: transplantDate
        }
      }
      const updatedPlants = await prisma.plantas.updateMany(param)

      const plantsWithEmptyDate = plantsToUpdate.filter(plant => {
        return !plant.floweringDate
      }).map(plant => {
        return plant.id
      })


      const updateDateParams = {
        where: {
          id: { in: plantsWithEmptyDate },

        },
        data: {
          floweringDate: transplantDate,
          floweringLocation: selectedLocation.name,
          floweringRecipient: selectedRecipiente.name,

        }
      }

      const updatedDatePlants = await prisma.plantas.updateMany(updateDateParams)


    }




  }
}
