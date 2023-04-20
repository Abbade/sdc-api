/*
  Warnings:

  - Added the required column `amount` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "max_amount" INTEGER,
ADD COLUMN     "min_amount" INTEGER;
