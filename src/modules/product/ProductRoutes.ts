import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
} from "./ProductController";

const router = express.Router();

// Rota para criar um novo produto
router.post("/", createProduct);

// Rota para obter todos os produtos
router.get("/", getAllProducts);

// Rota para obter um produto pelo ID
router.get("/:id", getProductById);

// Rota para atualizar um produto pelo ID
router.put("/:id", updateProductById);

// Rota para deletar um produto pelo ID
router.delete("/:id", deleteProductById);

export default router;
