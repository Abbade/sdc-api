/*
  Warnings:

  - Added the required column `secao` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "secao" TEXT NOT NULL;
