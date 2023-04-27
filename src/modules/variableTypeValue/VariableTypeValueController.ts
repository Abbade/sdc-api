// Rota para criar um novo VariableType
import { Request, Response } from "express";
import {
  createVariableValueType,
  getVariableTypeValueById,
  getAllVariableTypeValues,
  updateVariableTypeValueById,
  deleteVariableTypeValueById,
  VariableTypeValueInterface,
} from "../../middlewares/repository/VariableTypeValueRepository";
import { IFilter } from "../../interfaces/IFilter";
import { VariableTypeValue } from "../../interfaces/StockInterface";
import { GenericListInterface } from "../../interfaces/GenericListInterface";

// Função para criar um novo VariableType
export const createVariableValueTypeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const variableTypeData: VariableTypeValue = req.body;
  try {
    const createdVariableType = await createVariableValueType(variableTypeData);
    res.status(201).json(createdVariableType);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Erro ao criar VariableType: ${error.message}` });
  }
};

// Função para buscar um VariableType pelo ID
export const getVariableTypeValueByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const variableTypeValueId: number = Number(req.params.variableTypeValueId);
  try {
    const variableType = await getVariableTypeValueById(variableTypeValueId);
    if (variableType) {
      res.status(200).json(variableType);
    } else {
      res.status(404).json({ error: "VariableType não encontrado" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Erro ao buscar VariableType pelo ID: ${error.message}` });
  }
};

// Função para buscar todos os VariableTypes
export const getAllVariableTypeValuesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, limit, page, variableTypeId } = req.query;
  const filter: VariableTypeValueInterface = {
    name: name ? String(name) : "",
    limit: limit ? Number(limit) : 999,
    page: page ? Number(page) : 1,
    variableTypeId: variableTypeId ? Number(variableTypeId) : 0
  };
  try {
    const result: GenericListInterface = await getAllVariableTypeValues({
      name: String(name),
      limit: Number(limit),
      page: Number(page),
      variableTypeId: variableTypeId ? Number(variableTypeId) : 0
    });
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Erro ao buscar VariableTypes: ${error.message}` });
  }
};

// Função para atualizar um VariableType pelo ID
export const updateVariableTypeValueByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const variableTypeId: number = Number(req.params.variableTypeId);
  const variableTypeValueData: VariableTypeValue = req.body;
  try {
    const updatedVariableType = await updateVariableTypeValueById(
      variableTypeId,
      variableTypeValueData
    );
    if (updatedVariableType) {
      res.status(200).json(updatedVariableType);
    } else {
      res.status(404).json({ error: "VariableType não encontrado" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: `Erro ao atualizar VariableType pelo ID: ${error.message}`,
      });
  }
};

// Função para deletar um VariableType pelo ID
export const deleteVariableTypeValueByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const variableTypeId: number = Number(req.params.variableTypeId);
  try {
    const deletedVariableType = await deleteVariableTypeValueById(
      variableTypeId
    );
    if (deletedVariableType) {
      res.status(200).json({ message: "VariableType removido com sucesso" });
    } else {
      res.status(404).json({ error: "VariableType não encontrado" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: `Erro ao deletar VariableType pelo ID: ${error.message}`,
      });
  }
};
