/*
  Warnings:

  - You are about to drop the column `qtdTotal` on the `lotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "qtdTotal",
ADD COLUMN     "qtPlant" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qtProp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qtThrashed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qtTotal" INTEGER NOT NULL DEFAULT 0;
