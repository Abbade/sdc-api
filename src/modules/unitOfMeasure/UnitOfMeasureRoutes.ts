import express from "express";
import {
  createUnitOfMeasure,
  getAllUnitOfMeasures,
  getUnitOfMeasureById,
  updateUnitOfMeasureById,
  deleteUnitOfMeasureById
} from "./UnitOfMeasureController";

const router = express.Router();

// Rota para criar um novo produto
router.post("/", createUnitOfMeasure);

// Rota para obter todos os produtos
router.get("/", getAllUnitOfMeasures);

// Rota para obter um produto pelo ID
router.get("/:id", getUnitOfMeasureById);

// Rota para atualizar um produto pelo ID
router.put("/:id", updateUnitOfMeasureById);

// Rota para deletar um produto pelo ID
router.delete("/:id", deleteUnitOfMeasureById);

export default router;
