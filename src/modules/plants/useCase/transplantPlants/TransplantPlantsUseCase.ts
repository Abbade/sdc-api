import { ActionPlants, Actions, FasesCultivo, Locations } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { TIPO_FASE_CULTIVO } from "../../../../constants/TIPO_FASE_CULTIVO";
import { ACTION_TYPE } from "../../../../constants/ACTION_TYPE";

const postmanJson = {
  transplantDate: "2012-04-30T18:25:43.511Z",
  plants: [1, 2, 3, 4],
  id_recipiente: 1,
  id_location: 1,
  id_faseCultivo: 2,

  obs: "Ae",
};

interface ITransplantPlants {
  id_user_create: number;
  transplantDate: Date;
  startDate: Date;
  endDate: Date;
  plants: number[];

  id_recipiente: number;
  id_location: number;
  id_faseCultivo: number;

  id_user_atribution: number;
  scheduled: boolean;
  obs: string;
}

interface ITransplantUpdate {}

export class TransplantPlantsUseCase {
  async execute({
    transplantDate,
    plants,
    id_recipiente,
    id_location,
    id_faseCultivo,
    id_user_create,
    obs,
    id_user_atribution,
    startDate,
    endDate,
    scheduled
  }: ITransplantPlants) {
    let selectedFaseCultivoChangeAction: Actions | undefined | null;
    let selectedLocationChangeAction: Actions | undefined | null;
    let selectedFaseCultivo: FasesCultivo | null | undefined;
    let selectedLocation: Locations | null | undefined;

    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente,
      },
    });

    if (!selectedRecipiente) {
      throw new Error("Recipiente não existente: " + id_recipiente);
    }

    if (id_location) {
      const selectedLocation = await prisma.locations.findFirst({
        where: {
          id: id_location,
        },
      });

      if (!selectedLocation) {
        throw new Error("Localização não existente: " + id_location);
      }
    }

    let plantsToUpdate = await prisma.plantas.findMany({
      where: {
        id: { in: plants },
      },
      include: {
        faseCultivo: true,
      },
    });

    plantsToUpdate.map((plant) => {
      if (plant.trashDate) {
        throw new Error("Não é possivel transplantar plantas descartadas.");
      }

      if (plant.cropDate) {
        throw new Error("Não é possivel transplantar plantas colhidas.");
      }

      if (plant.id_recipiente == selectedRecipiente.id) {
        throw new Error(
          "Não é possivel transplantar planta para um mesmo recipiente."
        );
      }

      if (plant.lastTransplant && plant.lastTransplant > transplantDate) {
        throw new Error(
          "Não é possivel transplantar plantas em uma data anterior a ultimo transplante."
        );
      }

      if (plant.faseCultivo.ordem > id_faseCultivo) {
        throw new Error(
          "Não é possivel voltar com plantas para fase anterior."
        );
      }
    });

    let actions = [] as ActionPlants[];

    const newActionGroup = await (
      await prisma.actionGroups.create({
        data: {
          id_user_create: id_user_create,
          obs: obs,
          startDate: startDate,
          endDate: endDate
        },
      })
    ).id;

    const selectedRecipientChangeAction = await prisma.actions.create({
      data: {
        id_user_create: id_user_create,
        isLote: false,
        isPlant: false,
        isCrop: false,
        name: "Alteração de recipiente",
        id_actionType: ACTION_TYPE.TRANSPLANTE,
        created_at: new Date(),
        scheduledDate: scheduled ? transplantDate : undefined,
        id_actionGroup: newActionGroup,
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,    
         id_user_completion: scheduled ? undefined: id_user_atribution,
        
          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
        qtd: plantsToUpdate.length,
      },
    });

    

    if (id_location) {
      selectedLocationChangeAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Mover plantas",
          id_actionType: ACTION_TYPE.ALTERA_LOCAL,
          created_at: new Date(),
          scheduledDate: scheduled ? transplantDate : undefined,
          id_actionGroup: newActionGroup,
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,    
         id_user_completion: scheduled ? undefined: id_user_atribution,
        
          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          qtd: plantsToUpdate.length,
        },
      });
    }

    if (id_faseCultivo) {
      selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
        where: {
          id: id_faseCultivo,
        },
      });

      if (!selectedFaseCultivo) {
        throw new Error("Fase de cultivo não existente: " + id_faseCultivo);
      }

      selectedFaseCultivoChangeAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Alteração de fase",
          id_actionType: ACTION_TYPE.ALTERA_FASE_CULTIVO,
          created_at: new Date(),
          scheduledDate: scheduled ? transplantDate : undefined,
          id_actionGroup: newActionGroup,
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,    
         id_user_completion: scheduled ? undefined: id_user_atribution,
        
          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          qtd: plantsToUpdate.length,
        },
      });
    }
    //VALIDA VIABILIDADE DE TRANSPLANTE

    //DESCARTADA?

    plantsToUpdate.forEach((plant) => {
      const newActionParams = {
        id_planta: plant.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,    
         id_user_completion: scheduled ? undefined: id_user_atribution,
        
          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
        id_action: selectedRecipientChangeAction.id,
        scheduledDate: scheduled ? transplantDate : undefined,

        id_recipiente: id_recipiente,

        id_recipiente_old: id_recipiente ? plant.id_recipiente : undefined,
      } as ActionPlants;
      actions.push(newActionParams);

      if (selectedLocationChangeAction) {
        const newActionLocationParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,    
         id_user_completion: scheduled ? undefined: id_user_atribution,
         scheduledDate: scheduled ? transplantDate : undefined,
        
          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          id_action: selectedLocationChangeAction?.id,

          id_location: id_location,

          id_location_old: id_location ? plant.id_location : undefined,
        } as ActionPlants;
        actions.push(newActionLocationParams);
      }
      console.log(selectedFaseCultivoChangeAction);
      if (selectedFaseCultivoChangeAction) {
        const newActionChangeStageParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : transplantDate,    
         id_user_completion: scheduled ? undefined: id_user_atribution,
        
          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          id_action: selectedFaseCultivoChangeAction?.id,
          scheduledDate: scheduled ? transplantDate : undefined,

          id_faseCultivo: id_faseCultivo,

          id_faseCultivo_old: id_faseCultivo ? plant.id_faseCultivo : undefined,
        } as ActionPlants;
        actions.push(newActionChangeStageParams);
      }
    });

    let updatePlantsParams = {
      where: {
        id: { in: plants },
      },
      data: {
        id_recipiente: id_recipiente,
      },
    } as any;

    if (id_location) updatePlantsParams.data.id_location = id_location;
    if (id_faseCultivo) updatePlantsParams.data.id_faseCultivo = id_faseCultivo;
    if (
      selectedFaseCultivo?.id_tipo_fase_cultivo == TIPO_FASE_CULTIVO.VEGETACAO
    )
      updatePlantsParams.data.vegetationDate = transplantDate;
    if (selectedFaseCultivo?.id_tipo_fase_cultivo == TIPO_FASE_CULTIVO.FLORACAO)
      updatePlantsParams.data.floweringDate = transplantDate;
    if (!scheduled) { 
    const updatedPlants = await prisma.plantas.updateMany(updatePlantsParams);
    }
    const createActionPlants = await prisma.actionPlants.createMany({
      data: actions,
    });
    return actions;
  }
}
