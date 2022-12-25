import { FasesCultivo, Locations } from '@prisma/client';
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
    // const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
    //   where: {
    //     id: id_faseCultivo
    //   }
    // })

    // if (!selectedFaseCultivo) {
    //   throw new Error('Fase de cultivo não existente: ' + id_faseCultivo);
    // }

    // const selectedLocation = await prisma.locations.findFirst({
    //   where: {
    //     id: id_location
    //   }
    // })

    // if (!selectedLocation) {
    //   throw new Error('Local não existente: ' + id_location);
    // }

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


    let selectedFaseCultivoChangeAction: any;
    let selectedLocationChangeAction: any;
    let selectedFaseCultivo: FasesCultivo | null | undefined;
    let selectedLocation: Locations | null | undefined;

    let actions = [] as any;

    const newActionGroup = await (await prisma.actionGroups.create({
      data: {
        id_user_create: id_user_create,
        obs: obs
      }
    })).id


    const selectedRecipientChangeAction = await prisma.actions.findFirst({
      where: {
        name: "Transplante de planta"
      }
    })


    if (!selectedRecipientChangeAction) {
      throw new Error('Action para log não existente: ' + id_faseCultivo);
    }

    if (id_location) {

      selectedLocationChangeAction = await prisma.actions.findFirst({
        where: {
          name: "Mover plantas"
        }
      })



      if (!selectedLocationChangeAction) {
        throw new Error('Action para log não existente: ' + id_faseCultivo);
      }
    }


    if (id_faseCultivo) {

      selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
        where: {
          id: id_faseCultivo
        }
      })

      if (!selectedFaseCultivo) {
        throw new Error('Fase de cultivo não existente: ' + id_faseCultivo);
      }

      if (selectedFaseCultivo?.name === "Vegetação") {
        selectedFaseCultivoChangeAction = await prisma.actions.findFirst({
          where: {
            name: "Vegetar planta"
          }
        })
        if (!selectedFaseCultivoChangeAction) {
          throw new Error('Action para log não existente: ' + id_faseCultivo);
        }
      }


      if (selectedFaseCultivo?.name === "Floração") {
        selectedFaseCultivoChangeAction = await prisma.actions.findFirst({
          where: {
            name: "Florir planta"
          }
        })
        if (!selectedFaseCultivoChangeAction) {
          throw new Error('Action para log não existente: ' + id_faseCultivo);
        }
      }




    }
    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?
    plantsToUpdate.map((plant) => {

      if (plant.trashDate) {
        throw new Error('Não é possivel transplantar plantas descartadas.')
      }

      if (plant.cropDate) {
        throw new Error('Não é possivel transplantar plantas colhidas.')
      }

      if (plant.id_recipiente == selectedRecipiente.id) {
        throw new Error('Não é possivel transplantar planta para um mesmo recipiente.')
      }

      if (plant.lastTransplant && plant.lastTransplant > transplantDate) {
        throw new Error('Não é possivel transplantar plantas em uma data anterior a ultimo transplante.')

      }

      if (plant.id_faseCultivo > id_faseCultivo) {
        throw new Error('Não é possivel voltar com plantas para fase anterior.')
      }




    })






    plantsToUpdate.forEach(plant => {
      const newActionParams = {
        id_planta: plant.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        completionDate: transplantDate,

        id_user_atribution: id_user_create,
        id_action: selectedRecipientChangeAction.id,

        id_recipiente: id_recipiente,

        id_recipiente_old: id_recipiente ? plant.id_recipiente : undefined,
      }
      actions.push(newActionParams)

      if (selectedLocationChangeAction) {
        const newActionLocationParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: "Completed",
          isCompleted: true,
          completionDate: transplantDate,

          id_user_atribution: id_user_create,
          id_action: selectedLocationChangeAction?.id,

          id_location: id_location,

          id_location_old: id_location ? plant.id_location : undefined
        }
        actions.push(newActionLocationParams)

      }
      if (selectedFaseCultivoChangeAction) {

        const newActionChangeStageParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: "Completed",
          isCompleted: true,
          completionDate: transplantDate,

          id_user_atribution: id_user_create,
          id_action: selectedFaseCultivoChangeAction?.id,

          id_faseCultivo: id_faseCultivo,

          id_faseCultivo_old: id_faseCultivo ? plant.id_faseCultivo : undefined,
        }
        actions.push(newActionChangeStageParams)

      }

    })

    let updatePlantsParams = {
      where: {
        id: { in: plants },

      },
      data: {
        id_recipiente: id_recipiente,
      }
    } as any

    if (id_location)
      updatePlantsParams.data.id_location = id_location
    if (id_faseCultivo)
      updatePlantsParams.data.id_faseCultivo = id_faseCultivo
    if (selectedFaseCultivo?.name == "Vegetação")
      updatePlantsParams.data.vegetationDate = transplantDate
    if (selectedFaseCultivo?.name == "Floração")
      updatePlantsParams.data.floweringDate = transplantDate


    const updatedPlants = await prisma.plantas.updateMany(updatePlantsParams)
    const createActionPlants = await prisma.actionPlants.createMany({ data: actions })
    return actions
  }
}
