import { Plantas } from "@prisma/client";
import { prisma } from "../../database/prismaClient";

export async function validateTrashReason(trashReasonId: number): Promise<void> {
    const selectedTrashReason = await prisma.trashReasons.findFirst({
      where: {
        id: trashReasonId,
      },
    });
  
    if (!selectedTrashReason) {
      throw new Error("Motivo de descarte não existente: " + trashReasonId);
    }
  }
  
  export async function validateRecipiente(recipientId: number): Promise<void> {
    const selectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: recipientId,
      },
    });
  
    if (!selectedRecipiente) {
      throw new Error("Recipiente não existente: " + recipientId);
    }
  }
  
  export  async function validateFaseCultivo(stageId: number): Promise<void> {
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        id: stageId,
      },
    });
  
    if (!selectedFaseCultivo) {
      throw new Error("Fase de cultivo não existente: " + stageId);
    }
  }
  
  export  async function validateLocation(id_location: number): Promise<void> {
    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: id_location,
      },
    });
  
    if (!selectedLocation) {
      throw new Error("Localização não existente: " + id_location);
    }
  }
  
  export function validatePlants(plants: Plantas[]): void {
    for (const plant of plants) {
      if (plant.trashDate) {
        throw new Error("Não é possivel transplantar plantas descartadas.");
      }
  
      if (plant.cropDate) {
        throw new Error("Não é possivel transplantar plantas colhidas.");
      }
    }
  }