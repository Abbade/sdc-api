import { Router } from 'express';
import {
  createVariableTypeController,
  getAllVariableTypesController,
  getVariableTypeByIdController,
  updateVariableTypeController,
  deleteVariableTypeController,
} from './VariableTypeController'; // Importe os controllers do seu arquivo

const router = Router();

// Rota para criar um novo VariableType
router.post('/', createVariableTypeController);

// Rota para buscar todos os VariableTypes
router.get('/', getAllVariableTypesController);

// Rota para buscar um VariableType por ID
router.get('/:id', getVariableTypeByIdController);

// Rota para atualizar um VariableType por ID
router.put('/:id', updateVariableTypeController);

// Rota para deletar um VariableType por ID
router.delete('/:id', deleteVariableTypeController);

export default router;
