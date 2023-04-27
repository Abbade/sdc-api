import { prisma } from "../../database/prismaClient";
import { GenericListInterface } from "../../interfaces/GenericListInterface";
import { IFilter } from "../../interfaces/IFilter";
import { VariableType, VariableTypeValue } from "../../interfaces/StockInterface";


export interface VariableTypeValueInterface extends IFilter{
  variableTypeId?: number;
}
// Função para criar um novo VariableType
export const createVariableValueType = async (
  variableTypeData: VariableTypeValue
): Promise<VariableTypeValue> => {
  try {
    console.log(variableTypeData);
    const createdVariableType = await prisma.variableTypeValue.create({
      data: {
        name: variableTypeData.name,
        active: true,
        variableTypeId: variableTypeData.variableTypeId
      },
    });
    return createdVariableType;
  } catch (error: any) {
    throw new Error(`Erro ao criar VariableType: ${error.message}`);
  }
};

// Função para buscar um VariableType pelo ID
export const getVariableTypeValueById = async (
  variableTypeValueId: number
): Promise<VariableTypeValue | null> => {
  try {
    const variableType = await prisma.variableTypeValue.findUnique({
      where: { id: variableTypeValueId },
    });
    return variableType;
  } catch (error: any) {
    throw new Error(`Erro ao buscar VariableType pelo ID: ${error.message}`);
  }
};

// Função para buscar todos os VariableTypes
export const getAllVariableTypeValues = async ({
  name,
  limit,
  page,
  variableTypeId
}: VariableTypeValueInterface): Promise<GenericListInterface> => {
  console.log(name);
  const total = await prisma.variableTypeValue.count({
    where: {
      variableTypeId: {
        equals: variableTypeId
      }

    },
  });
  const itens = await prisma.variableTypeValue.findMany({
    take: !isNaN(limit) ? Number.parseInt(limit.toString()) : 9999,
    skip: !isNaN(page) ? (page - 1) * limit : 0,
    where: {
      variableTypeId: {
        equals: variableTypeId
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
export const updateVariableTypeValueById = async (
  variableTypeId: number,
  variableTypeValueData: VariableTypeValue
): Promise<VariableTypeValue | null> => {
  try {
    const updatedVariableType = await prisma.variableTypeValue.update({
      where: { id: variableTypeId },
      data: {
        name: variableTypeValueData.name,
        active: true,
      },
    });
    return updatedVariableType;
  } catch (error: any) {
    throw new Error(`Erro ao atualizar VariableType pelo ID: ${error.message}`);
  }
};

// Função para deletar um VariableType pelo ID
export const deleteVariableTypeValueById = async (
  variableTypeId: number
): Promise<VariableTypeValue | null> => {
  try {
    const deletedVariableType = await prisma.variableTypeValue.update({
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
