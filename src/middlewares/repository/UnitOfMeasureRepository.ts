// Importe o PrismaClient
import { UnitOfMeasure } from "@prisma/client";
import { prisma } from "../../database/prismaClient";
import { GenericListInterface } from "../../interfaces/GenericListInterface";
import { IFilter } from "../../interfaces/IFilter";


// Defina os métodos de CRUD para o modelo UnitOfMeasure
export default {
  // Cria um novo produto
  createUnitOfMeasure: async (data: UnitOfMeasure): Promise<UnitOfMeasure> => {
    // Crie o produto pai (parent) primeiro, se houver

    return prisma.unitOfMeasure.create({
      data: data,
    });
  },

  // Obtém todos os produtos
  getAllUnitOfMeasures: async ({
    name,
    limit,
    page,
  }: IFilter): Promise<GenericListInterface> => {
    const total = await prisma.unitOfMeasure.count({
      where: {
        name: {
          contains: name
        }
      }
    })
    let itens = await prisma.unitOfMeasure.findMany({
      take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
      skip: !isNaN(page) ? (page - 1) * limit : 0,
      where: {
        name: {
          contains: name,
        },
        active: true,
      },
    });
    return {
      total,
      itens
    };
 
  },

  // Obtém um produto pelo ID
  getUnitOfMeasureById: async (id: number): Promise<UnitOfMeasure | null> => {
    return prisma.unitOfMeasure.findUnique({ where: { id } });
  },

  // Atualiza um produto pelo ID
  updateUnitOfMeasureById: async (
    id: number,
    data: Partial<UnitOfMeasure>
  ): Promise<UnitOfMeasure | null> => {
    return prisma.unitOfMeasure.update({
      where: { id },
      data: data,
    });
  },

  // Deleta um produto pelo ID
  deleteUnitOfMeasureById: async (id: number): Promise<UnitOfMeasure | null> => {
    return prisma.unitOfMeasure.update({ where: { id }, data: { active: false } });
  },
};
