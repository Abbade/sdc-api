/*
  Warnings:

  - You are about to drop the column `desc_variable` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `value_variable` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "desc_variable",
DROP COLUMN "value_variable",
ADD COLUMN     "variable_type_id" INTEGER,
ADD COLUMN     "variable_type_value_id" INTEGER;

-- CreateTable
CREATE TABLE "variable_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "variable_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variable_type_value" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "variable_type_id" INTEGER NOT NULL,

    CONSTRAINT "variable_type_value_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_variable_type_id_fkey" FOREIGN KEY ("variable_type_id") REFERENCES "variable_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_variable_type_value_id_fkey" FOREIGN KEY ("variable_type_value_id") REFERENCES "variable_type_value"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable_type_value" ADD CONSTRAINT "variable_type_value_variable_type_id_fkey" FOREIGN KEY ("variable_type_id") REFERENCES "variable_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
