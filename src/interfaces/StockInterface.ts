import { Decimal } from "@prisma/client/runtime";

export interface Product {
  id?: number;
  name: string;
  active: boolean;
  value: number;
  skuCode: string;
  barCode: string;
  obs?: string | null; // Permitir valor null
  isVariable: boolean;
  parent?: Product | null;
  children?: Product[] | undefined;
  parentId?: number | null;
  descVariable?: string | null;
  valueVariable?: string | null;
  unitOfMeasureId: number;
  unitOfMeasure?: UnitOfMeasure;
  productCategoryId?: number | null;
  productCategory?: ProductCategory | null;
  height?: number | null;
  width?: number | null;
  depth?: number | null;
  volumes?: number | null;
  netWeight?: number | null;
  grossWeight?: number | null;

  amount: Number | string | Decimal;
  minAmount: Number | null | string;
  maxAmount: Number | null | string;
}

export interface UnitOfMeasure {
  id: number;
  name: string;
  active: boolean;
  products: Product[];
}

export interface ProductCategory {
  id: number;
  name: string;
  active: boolean;
  products: Product[];
}
