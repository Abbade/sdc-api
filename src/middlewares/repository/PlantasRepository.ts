import { Plantas } from "@prisma/client";
import { prisma } from "../../database/prismaClient";

export async function getPlantsById(ids: number[]): Promise<Plantas[]> {
    const plantsToUpdate = await prisma.plantas.findMany({
        where: {
            id: { in: ids },
        },
        include: {
            faseCultivo: true,
        },
    });

    return plantsToUpdate;
}

export async function updatePlantsRecipient(plantsId: number[], recipientId: number) {
    const updatePlantsParams = {
      where: {
        id: { in: plantsId },
      },
      data: {
        recipientId: recipientId,
      },
    } as any;
    return await prisma.plantas.updateMany(updatePlantsParams);
  }
  
  export async function updatePlantsLocation(plantsId: number[], id_location: number) {
    const updatePlantsParams = {
      where: {
        id: { in: plantsId },
      },
      data: {
        id_location: id_location,
      },
    } as any;
    return await prisma.plantas.updateMany(updatePlantsParams);
  }
  
  export async function updatePlantsFaseCultivo(plantsId: number[], stageId: number) {
    const updatePlantsParams = {
      where: {
        id: { in: plantsId },
      },
      data: {
        stageId: stageId,
      },
    } as any;
    return await prisma.plantas.updateMany(updatePlantsParams);
  }
  
  export async function updatePlantsTrashed(plantsId: number[], actionDate: Date) {
    const updatePlantsParams = {
      where: {
        id: { in: plantsId },
      },
      data: {
        trashDate: actionDate,
      },
    } as any;
    return await prisma.plantas.updateMany(updatePlantsParams);
  }
  
  //
  
  export async function updatePlantsCropped(
    plantsId: number[],
    actionDate: Date,
    commonActionData: any
  ) {
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        ordem: 5,
      },
    });
  
    if (!selectedFaseCultivo) {
      throw new Error("Fase de Cultivo para log não existente: Colher");
    }
  
    const updatePlantsParams = {
      where: {
        id: { in: plantsId },
      },
      data: {
        cropDate: actionDate,
        stageId: selectedFaseCultivo.id,
      },
    } as any;
    return await prisma.plantas.updateMany(updatePlantsParams);
  }