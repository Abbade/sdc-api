/*
  Warnings:

  - Added the required column `massTrashed` to the `trashedLotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trashedLotes" ADD COLUMN     "massTrashed" DOUBLE PRECISION NOT NULL;
