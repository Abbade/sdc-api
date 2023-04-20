import { Request, Response } from "express";
import UnitOfMeasureRepository from "../../middlewares/repository/UnitOfMeasureRepository"
import { UnitOfMeasure } from "../../interfaces/StockInterface";

// Função para criar um novo item
export const createUnitOfMeasure = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: UnitOfMeasure = req.body;
    const item = await UnitOfMeasureRepository.createUnitOfMeasure(data);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao criar a unidade de medida", error });
  }
};

// Função para obter todos os items
export const getAllUnitOfMeasures = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, limit,page  } = req.query;
    const items = await UnitOfMeasureRepository.getAllUnitOfMeasures(
      {
        name : name?.toString(),
        limit : Number.parseInt(limit?.toString() as string),
        page : Number.parseInt(page?.toString() as string)
      }
    );
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao obter as unidade de medidas", error });
  }
};

// Função para obter um item pelo ID
export const getUnitOfMeasureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const item = await UnitOfMeasureRepository.getUnitOfMeasureById(id);
    if (item) {
      res.status(200).json({ success: true, data: item });
    } else {
      res.status(404).json({ success: false, message: "unidade de medida não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao obter a unidade de medida", error });
  }
};

// Função para atualizar um item pelo ID
export const updateUnitOfMeasureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data: Partial<UnitOfMeasure> = req.body;
    const item = await UnitOfMeasureRepository.updateUnitOfMeasureById(id, data);
    if (item) {
      res.status(200).json({ success: true, data: item });
    } else {
      res.status(404).json({ success: false, message: "unidade de medida não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao atualizar o unidade de medida", error });
  }
};

// Função para deletar um item pelo ID
export const deleteUnitOfMeasureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const item = await UnitOfMeasureRepository.deleteUnitOfMeasureById(id);
    if (item) {
      res.status(200).json({ success: true, data: item });
    } else {
      res.status(404).json({ success: false, message: "Unidade de medida não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao deletar o Unidade de medida", error });
  }
};
