import { prisma } from "../database/prismaClient";

export async function findGeneticById(id_genetic: number) {
    const selectedGenetic = await prisma.genetics.findFirst({
      where: {
        id: id_genetic,
      },
    });
  
    if (!selectedGenetic) {
      throw new Error('Genética não existente: ' + id_genetic);
    }
  
    return selectedGenetic;
  }

  export async function findFaseCultivoById(id_faseCultivo: number) {
    const selectedFaseCultivo = await prisma.fasesCultivo.findFirst({
      where: {
        id: id_faseCultivo,
      },
    });
  
    if (!selectedFaseCultivo) {
      throw new Error('Fase de Cultivo não existente: ' + id_faseCultivo);
    }
  
    return selectedFaseCultivo;
  }
  
  export async function findRecipienteById(id_recipiente: number) {
    const setlectedRecipiente = await prisma.recipientes.findFirst({
      where: {
        id: Number.parseInt(id_recipiente.toString()),
      },
    });
  
    if (!setlectedRecipiente) {
      throw new Error('Recipiente não existente: ' + id_recipiente);
    }
  
    return setlectedRecipiente;
  }

  export async function findLocationById(id_location: number) {
    const selectedLocation = await prisma.locations.findFirst({
      where: {
        id: Number.parseInt(id_location.toString()),
      },
    });
  
    if (!selectedLocation) {
      throw new Error('Recipiente não existente: ' + id_location);
    }
  
    return selectedLocation;
  }