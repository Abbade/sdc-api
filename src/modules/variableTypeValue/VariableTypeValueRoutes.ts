import { Router } from 'express';
import {
  createVariableValueTypeController,
  getAllVariableTypeValuesController,
  getVariableTypeValueByIdController,
  updateVariableTypeValueByIdController,
  deleteVariableTypeValueByIdController,
} from './VariableTypeValueController'; // Importe os controllers do seu arquivo

const router = Router();

// Rota para criar um novo VariableType
router.post('/', createVariableValueTypeController);

// Rota para buscar todos os VariableTypes
router.get('/', getAllVariableTypeValuesController);

// Rota para buscar um VariableType por ID
router.get('/:id', getVariableTypeValueByIdController);

// Rota para atualizar um VariableType por ID
router.put('/:id', updateVariableTypeValueByIdController);

// Rota para deletar um VariableType por ID
router.delete('/:id', deleteVariableTypeValueByIdController);

export default router;
