/*
  Warnings:

  - Added the required column `name` to the `plantas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plantas" ADD COLUMN     "name" TEXT NOT NULL;
