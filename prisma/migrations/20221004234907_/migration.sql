/*
  Warnings:

  - You are about to drop the column `total_clones` on the `lotes` table. All the data in the column will be lost.
  - Added the required column `qtdTotal` to the `lotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "total_clones",
ADD COLUMN     "qtdTotal" INTEGER NOT NULL;
