/*
  Warnings:

  - Added the required column `obs` to the `lotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "obs" TEXT NOT NULL;
