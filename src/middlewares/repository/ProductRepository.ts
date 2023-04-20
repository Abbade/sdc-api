// Importe o PrismaClient
import { prisma } from "../../database/prismaClient";
import { GenericListInterface } from "../../interfaces/GenericListInterface";
import { IFilter } from "../../interfaces/IFilter";
import { Product } from "../../interfaces/StockInterface";

// Defina os métodos de CRUD para o modelo Product
export default {
  // Cria um novo produto
  createProduct: async (data: Product): Promise<Product> => {
    // Crie o produto pai (parent) primeiro, se houver

    return prisma.product.create({
      data: {
        name: data.name,
        value: data.value,
        skuCode: data.skuCode,
        barCode: data.barCode,
        active: true,
        obs: data.obs,
        isVariable: data.isVariable == null ? false : data.isVariable,
        parentId: data.parentId,
        descVariable: data.descVariable,
        valueVariable: data.valueVariable,
        unitOfMeasureId: data.unitOfMeasureId,
        productCategoryId: data.productCategoryId,
        height: data.height,
        width: data.width,
        depth: data.depth,
        volumes: data.volumes,
        netWeight: data.netWeight,
        grossWeight: data.grossWeight,
        amount: Number.parseFloat(data.amount.toString())
      }
    });
  },

  // Obtém todos os produtos
  getAllProducts: async ({
    name,
    limit,
    page,
  }: IFilter): Promise<GenericListInterface> => {
    const total = await prisma.product.count({
      where: {
        name: {
          contains: name
        }
      }
    })
    let itens = await prisma.product.findMany({
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
      itens
    };
 
  },

  // Obtém um produto pelo ID
  getProductById: async (id: number): Promise<Product | null> => {
    return prisma.product.findUnique({ where: { id } });
  },

  // Atualiza um produto pelo ID
  updateProductById: async (
    id: number,
    data: Partial<Product>
  ): Promise<Product | null> => {
    return prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        value: data.value,
        skuCode: data.skuCode,
        barCode: data.barCode,
        obs: data.obs,
        isVariable: data.isVariable,
        // parent: data.parent,
        // children: data.children,
        parentId: data.parentId,
        descVariable: data.descVariable,
        valueVariable: data.valueVariable,
        unitOfMeasureId: data.unitOfMeasureId,
        //unitOfMeasure: data.unitOfMeasure,
        productCategoryId: data.productCategoryId,
        //productCategory: data.productCategory,
        height: data.height,
        width: data.width,
        depth: data.depth,
        volumes: data.volumes,
        netWeight: data.netWeight,
        grossWeight: data.grossWeight,
      },
    });
  },

  // Deleta um produto pelo ID
  deleteProductById: async (id: number): Promise<Product | null> => {
    return prisma.product.update({ where: { id }, data: { active: false } });
  },
};
