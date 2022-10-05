/*
  Warnings:

  - Added the required column `description` to the `Genetics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Genetics" ADD COLUMN     "description" TEXT NOT NULL;
