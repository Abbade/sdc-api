import { prisma } from "../database/prismaClient";

export async function createNewCrop(
    id_genetic: number,
    id_location: number,
    actionDate: Date,
    commonActionData: any
  ) {
    const selectedFaseCrop = await prisma.fasesCrop.findFirst({
      where: {
        ordem: 3,
      },
    });
  
    if (!selectedFaseCrop) {
      throw new Error("Fase de Crop para log não existente: Colher");
    }
  
    const selectedGenetic = await prisma.genetics.findFirst({
      where: {
        id: id_genetic,
      },
    });
  
    if (!selectedGenetic) {
      throw new Error("Genética para log não existente");
    }
  
    const cropId =
      (await prisma.crops.count({
        where: {
          id_genetic: id_genetic,
        },
      })) + 1;
  
    const newCrop = await prisma.crops.create({
      data: {
        name: selectedGenetic?.nick + "#" + cropId,
        cropDate: commonActionData.actionDate,
        id_genetic: id_genetic,
        id_fasesCrop: selectedFaseCrop.id,
        id_user_create: commonActionData.id_user_create,
        id_location: id_location,
        obs: commonActionData.obs,
        qtPlants: commonActionData.plants.length,
        dryingStartDate: commonActionData.actionDate,
        // cropFullWetMass: cropFullWetMass,
        // cropFlowerWetMass: cropFlowerWetMass,
        // cropWetTrimMass: cropWetTrimMass,
      },
    });
  }