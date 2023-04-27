import { Decimal } from "@prisma/client/runtime";

export interface Product {
  id?: number;
  name: string;
  active: boolean;
  value: number | null;
  skuCode: string;
  barCode: string | null;
  obs?: string | null; // Permitir valor null
  isVariable: boolean;
  parent?: Product | null;
  children?: Product[] | undefined;
  parentId?: number | null;
  variableTypeId?: number | null;
  variableValueTypeId?: number | null;
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

  amount: Number | string | Decimal | null;
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

export interface VariableType {
  id?: number;
  name: string;
  active: boolean;
  products?: any[];
  variableTypeValues?: VariableTypeValue[];
}

export interface VariableTypeValue {
  id?: number;
  name: string;
  active: boolean;
  variableTypeId: number;
}

