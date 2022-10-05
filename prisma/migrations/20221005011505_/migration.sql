/*
  Warnings:

  - You are about to drop the column `qtThrashed` on the `lotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "qtThrashed",
ADD COLUMN     "qtPropThrashed" INTEGER NOT NULL DEFAULT 0;
