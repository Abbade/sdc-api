/*
  Warnings:

  - You are about to drop the column `description` on the `actions` table. All the data in the column will be lost.
  - Added the required column `qtd` to the `actions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "actions" DROP COLUMN "description",
ADD COLUMN     "qtd" INTEGER NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
