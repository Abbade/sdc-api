import { ActionPlants } from "@prisma/client";
import { ACTION_TYPE } from "../../../../constants/ACTION_TYPE";
import { prisma } from "../../../../database/prismaClient";

interface ITrashLote {
  id_lote: number;
  aclimatationDate: Date;
  qtPlant: number;
  id_location: number;
  id_recipiente: number;
  obs: string;
  id_user_create: number;
  id_user_atribution: number;
  scheduled: boolean;
  startDate: Date;
  endDate: Date;
}

interface INewPlant {
  id_lote: number;
  name: string;
  obs: string;
  id_location?: number;
  id_recipiente?: number;
  aclimatationDate: Date;

  //GENERATED ABOVE
  aclimatationName: string;

  id_user_create: number;
  propDate: Date;
  propName: string;
  id_genetic: number;
  id_propagationType: number;

  id_faseCultivo: number;

}

export class CreatePlantsLoteUseCase {
  async execute({
    id_lote,
    aclimatationDate,
    qtPlant,
    id_location,
    id_recipiente,
    id_user_atribution,
    scheduled,
    obs,
    id_user_create,
    startDate,
    endDate
  }: ITrashLote) {
    if (qtPlant < 0) {
      throw new Error("Quantidade não deve ser negativa: " + qtPlant);
    }

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        ordem: 2,
      },
    });

    if (!selectedFaseCultivo) {
      throw new Error("Fase de cultivo não existente: " + 2);
    }

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedFaseCultivoProp = await prisma.fasesCultivo.findFirst({
      where: {
        ordem: 1,
      },
    });

    if (!selectedFaseCultivoProp) {
      throw new Error("Fase de cultivo não existente: " + 2);
    }

    const selectedLote = await prisma.lotes.findFirst({
      where: {
        id: id_lote,
      },
    });

    if (!selectedLote) {
      throw new Error("Lote não existente: " + id_lote);
    }

    const selectedGenetic = await prisma.genetics.findFirst({
      where: {
        id: selectedLote.id_genetic,
      },
    });

    if (!selectedGenetic) {
      throw new Error("Genética não existente: " + selectedLote.id);
    }

    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location,
      },
    });

    if (!selectedLocation) {
      throw new Error("Local não existente: " + selectedLote.id);
    }

    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: id_recipiente,
      },
    });

    if (!selectedRecipiente) {
      throw new Error("Recipiente não existente: " + selectedLote.id);
    }

    //VALIDA QUANTIDADE DE ESTACAS/SEEDLINGS
    if (selectedLote?.qtProp - qtPlant < 0) {
      throw new Error(
        "Lote não tem estacas suficiente para transplante.: " +
        selectedLote.qtProp
      );
    }

    let newPlants = [] as any[];

    const plantIndex = selectedLote.qtPlant + 1;


    let actions = [] as any;

    const newActionGroup = await (
      await prisma.actionGroups.create({
        data: {
          userCreate: {
            connect: {
              id: id_user_create
            }
          },
          obs: obs,
          startDate: new Date(),
          endDate: new Date(),
          name: 'a'
        },
      })
    ).id;



    const newAction = await prisma.actions.create({
      data: {
        id_user_create: id_user_create,
        isLote: true,
        isPlant: true,
        name: "Criação de Planta",
        id_actionType: ACTION_TYPE.CREATE_PLANT,
        created_at: new Date(),
        id_user_completion: id_user_atribution,
        id_user_atribution: id_user_atribution,
        isCompleted: true,
        completionDate: aclimatationDate,
        qtd: qtPlant,
        id_actionGroup: newActionGroup
      }
    })



    if (!scheduled) {
      for (let i = selectedLote.qtPlant + 1; i < plantIndex + qtPlant; i++) {
        newPlants.push({
          name: selectedLote.name + "#" + i,
          id_user_create: id_user_create,
          obs: obs,


          id_lote: id_lote,

          id_location: id_location,
          id_recipiente: id_recipiente,

          aclimatationDate: aclimatationDate,
          aclimatationRecipient: selectedRecipiente.name,
          aclimatationLocation: selectedLocation.name,
          lastTransplant: aclimatationDate,

          propDate: selectedLote.propDate,
          propName: selectedLote.name,
          id_genetic: selectedLote.id_genetic,
          id_propagationType: selectedLote.id_propagationType,

          id_faseCultivo: selectedFaseCultivo.id,

          //id_mother: selectedLote.id_mother
        });
      }

      const lote = await prisma.lotes.update({
        where: {
          id: id_lote,
        },
        data: {
          qtProp: selectedLote.qtProp - qtPlant,
          qtPlant: selectedLote.qtPlant + qtPlant,
        },
      });

      const plantsCount = await prisma.plantas.createMany({ data: newPlants });
      const plantNames = newPlants.map((plant) => {
        return plant.name;
      });

      const createdPlants = await prisma.plantas.findMany({
        where: {
          name: {
            in: plantNames,
          },
        },
      });


      createdPlants.forEach((plant) => {

        const newActionParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : aclimatationDate,
          id_user_completion: scheduled ? undefined : id_user_atribution,

          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          id_action: newAction.id,

        };
        actions.push(newActionParams);

      });


      const selectedFaseCultivoChangeAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Alteração de fase",
          id_actionType: ACTION_TYPE.ALTERA_FASE_CULTIVO,
          created_at: new Date(),

          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : aclimatationDate,
          id_user_completion: scheduled ? undefined : id_user_atribution,

          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          qtd: qtPlant,
        },
      });
      createdPlants.forEach((plant) => {
        const newActionParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,
          id_action: selectedFaseCultivoChangeAction.id,
          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : aclimatationDate,
          id_user_completion: scheduled ? undefined : id_user_atribution,

          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,

          id_faseCultivo: selectedFaseCultivo.id,

          id_faseCultivo_old: selectedFaseCultivoProp.id,
        };
        actions.push(newActionParams);
      });

      const selectedLocationChangeAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Mover plantas",
          id_actionType: ACTION_TYPE.ALTERA_LOCAL,
          created_at: new Date(),

          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : aclimatationDate,
          id_user_completion: scheduled ? undefined : id_user_atribution,

          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          qtd: qtPlant,
        },
      });
      createdPlants.forEach((plant) => {
        const newActionLocationParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : aclimatationDate,
          id_user_completion: scheduled ? undefined : id_user_atribution,

          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          id_action: selectedLocationChangeAction?.id,

          id_location: id_location,

          id_location_old: selectedLote.id_location_init,
        } as ActionPlants
        actions.push(newActionLocationParams);

      })


      const selectedRecipientChangeAction = await prisma.actions.create({
        data: {
          id_user_create: id_user_create,
          isLote: false,
          isPlant: false,
          isCrop: false,
          name: "Alteração de recipiente",
          id_actionType: ACTION_TYPE.TRANSPLANTE,
          created_at: new Date(),

          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : aclimatationDate,
          id_user_completion: scheduled ? undefined : id_user_atribution,

          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          qtd: qtPlant,
        },
      });
      createdPlants.forEach((plant) => {
        const newActionParams = {
          id_planta: plant.id,
          id_user_create: id_user_create,
          obs: obs,
          id_actionGroup: newActionGroup,

          status: scheduled ? "Agendada" : "Completed",
          isCompleted: scheduled ? false : true,
          completionDate: scheduled ? undefined : aclimatationDate,
          id_user_completion: scheduled ? undefined : id_user_atribution,

          id_user_atribution: id_user_atribution ? id_user_atribution : id_user_create,
          id_action: selectedRecipientChangeAction.id,

          id_recipiente: id_recipiente,

          // id_recipiente_old: id_recipiente ? plant.id_recipiente : undefined,
        } as ActionPlants;
        actions.push(newActionParams);

      })

      const createActionPlants = await prisma.actionPlants.createMany({
        data: actions,
      });
    }


    const actionLote = await prisma.actionLotes.create({
      data: {
        id_lote: selectedLote.id,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: scheduled ? "Agendada" : "Completed",
        isCompleted: scheduled ? false : true,
        completionDate: scheduled ? undefined : aclimatationDate,
        scheduledDate: scheduled ? aclimatationDate : undefined,
        id_user_completion: scheduled ? undefined : id_user_atribution,

        id_user_atribution: scheduled ? id_user_atribution : id_user_create,
        id_action: newAction.id,

        id_location: id_location,
        qt: qtPlant
      }
    })




    return 200;
  }
}
