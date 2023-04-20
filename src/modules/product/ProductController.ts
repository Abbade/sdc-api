import { Request, Response } from "express";
import ProductRepository from "../../middlewares/repository/ProductRepository"
import { Product } from "../../interfaces/StockInterface";

// Função para criar um novo produto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Product = req.body;
    const product = await ProductRepository.createProduct(data);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao criar o produto", error });
  }
};

// Função para obter todos os produtos
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, limit,page  } = req.query;
    const products = await ProductRepository.getAllProducts(
      {
        name : name?.toString(),
        limit : Number.parseInt(limit?.toString() as string),
        page : Number.parseInt(page?.toString() as string)
      }
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao obter os produtos", error });
  }
};

// Função para obter um produto pelo ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await ProductRepository.getProductById(id);
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao obter o produto", error });
  }
};

// Função para atualizar um produto pelo ID
export const updateProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data: Partial<Product> = req.body;
    const product = await ProductRepository.updateProductById(id, data);
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao atualizar o produto", error });
  }
};

// Função para deletar um produto pelo ID
export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await ProductRepository.deleteProductById(id);
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao deletar o produto", error });
  }
};
