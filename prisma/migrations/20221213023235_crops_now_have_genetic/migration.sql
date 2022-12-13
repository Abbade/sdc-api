/*
  Warnings:

  - Added the required column `id_genetic` to the `Crops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crops" ADD COLUMN     "id_genetic" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Crops" ADD CONSTRAINT "Crops_id_genetic_fkey" FOREIGN KEY ("id_genetic") REFERENCES "genetics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
