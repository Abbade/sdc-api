/*
  Warnings:

  - Added the required column `propDate` to the `lotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "propDate" TIMESTAMP(3) NOT NULL;
