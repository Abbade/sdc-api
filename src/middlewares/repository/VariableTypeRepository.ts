import { prisma } from "../../database/prismaClient";
import { GenericListInterface } from "../../interfaces/GenericListInterface";
import { IFilter } from "../../interfaces/IFilter";
import { VariableType } from "../../interfaces/StockInterface";

// Função para criar um novo VariableType
export const createVariableType = async (
  variableTypeData: VariableType
): Promise<VariableType> => {
  try {
    const createdVariableType = await prisma.variableType.create({
      data: {
        name: variableTypeData.name,
        active: true,
      },
    });
    return createdVariableType;
  } catch (error: any) {
    throw new Error(`Erro ao criar VariableType: ${error.message}`);
  }
};

// Função para buscar um VariableType pelo ID
export const getVariableTypeById = async (
  variableTypeId: number
): Promise<VariableType | null> => {
  try {
    const variableType = await prisma.variableType.findUnique({
      where: { id: variableTypeId },
    });
    return variableType;
  } catch (error: any) {
    throw new Error(`Erro ao buscar VariableType pelo ID: ${error.message}`);
  }
};

// Função para buscar todos os VariableTypes
export const getAllVariableTypes = async ({
  name,
  limit,
  page,
}: IFilter): Promise<GenericListInterface> => {
  const total = await prisma.variableType.count({
    where: {
      name: {
        contains: name,
      },
    },
  });
  const itens = await prisma.variableType.findMany({
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
    itens,
  };
};

// Função para atualizar um VariableType pelo ID
export const updateVariableTypeById = async (
  variableTypeId: number,
  variableTypeData: VariableType
): Promise<VariableType | null> => {
  try {
    const updatedVariableType = await prisma.variableType.update({
      where: { id: variableTypeId },
      data: {
        name: variableTypeData.name,
        active: true,
      },
    });
    return updatedVariableType;
  } catch (error: any) {
    throw new Error(`Erro ao atualizar VariableType pelo ID: ${error.message}`);
  }
};

// Função para deletar um VariableType pelo ID
export const deleteVariableTypeById = async (
  variableTypeId: number
): Promise<VariableType | null> => {
  try {
    const deletedVariableType = await prisma.variableType.update({
      where: { id: variableTypeId },
      data: {
        active: false,
      },
    });
    return deletedVariableType;
  } catch (error: any) {
    throw new Error(`Erro ao deletar VariableType pelo ID: ${error.message}`);
  }
};
