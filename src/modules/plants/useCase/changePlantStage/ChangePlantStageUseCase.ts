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

interface IChangePlantStage {
  id_user_create: number;
  actionDate: Date;
  plants: number[];

  id_faseCultivo: number;


  obs: string;

}


export class ChangePlantStageUseCase {


  async execute({ actionDate, plants, id_faseCultivo, id_user_create, obs }: IChangePlantStage) {

    //VALIDA EXISTENCIA DE CAMPOS


    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        id: id_faseCultivo
      }
    })

    if (!selectedFaseCultivo) {
      throw new Error('Fase de cultivo não existente: ' + id_faseCultivo);
    }


    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants }
      }
    })



    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {

      if (plant.id_faseCultivo === id_faseCultivo) {
        throw new Error('Planta já está na fase de cultivo selecionada.')
      }

      if (plant.isTrashed) {
        throw new Error('Não é possivel alterar plantas descartadas.')
      }

      if (plant.isCropped) {
        throw new Error('Não é possivel alterar plantas colhidas.')
      }


    })


    if (selectedFaseCultivo.name == "Vegetação") {
      const updatePlantsParams = {
        where: {
          id: { in: plants },
        },
        data: {
          id_faseCultivo: id_faseCultivo,
          vegetationDate: actionDate
        }
      }
      const updatedDatePlants = await prisma.plantas.updateMany(updatePlantsParams)

    }

    if (selectedFaseCultivo.name == "Floração") {
      const updatePlantsParams = {
        where: {
          id: { in: plants },
        },
        data: {
          id_faseCultivo: id_faseCultivo,
          floweringDate: actionDate,
        }
      }
      const updatedDatePlants = await prisma.plantas.updateMany(updatePlantsParams)

    }







  }




}

