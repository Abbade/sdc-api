import { Request, Response } from 'express';
import {
  createVariableType,
  getVariableTypeById,
  updateVariableTypeById,
  deleteVariableTypeById,
  getAllVariableTypes,
} from '../../middlewares/repository/VariableTypeRepository';
import { IFilter } from '../../interfaces/IFilter';


// Rota para criar um novo VariableType
export const createVariableTypeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, active, products, variableTypeValues } = req.body;
    const newVariableType = await createVariableType({
      name,
      active,
      products,
      variableTypeValues,
    });
    res.status(201).json(newVariableType);
  } catch (error: any) {
    console.error('Erro ao criar VariableType:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getAllVariableTypesController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, limit, page } = req.query;
      const filter: IFilter = {
        name: name ? String(name) : '',
        limit: limit ? Number(limit) : 999,
        page: page ? Number(page) : 1,
        
      };
      const result = await getAllVariableTypes(filter);
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao buscar todos os VariableTypes:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };
  
// Rota para buscar um VariableType por ID
export const getVariableTypeByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const variableType = await getVariableTypeById(Number(id));
    if (variableType) {
      res.status(200).json(variableType);
    } else {
      res.status(404).json({ error: 'VariableType não encontrado' });
    }
  } catch (error: any) {
    console.error('Erro ao buscar VariableType:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Rota para atualizar um VariableType por ID
export const updateVariableTypeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, active, products, variableTypeValues } = req.body;
    const updatedVariableType = await updateVariableTypeById(Number(id), {
      name,
      active,
    });
    if (updatedVariableType) {
      res.status(200).json(updatedVariableType);
    } else {
      res.status(404).json({ error: 'VariableType não encontrado' });
    }
  } catch (error: any) {
    console.error('Erro ao atualizar VariableType:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Rota para deletar um VariableType por ID
export const deleteVariableTypeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedVariableType = await deleteVariableTypeById(Number(id));
    if (deletedVariableType) {
      res.status(200).json({ message: 'VariableType deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'VariableType não encontrado' });
    }
  } catch (error: any) {
    console.error('Erro ao deletar VariableType:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
