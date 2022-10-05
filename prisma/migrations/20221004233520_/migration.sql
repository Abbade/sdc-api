/*
  Warnings:

  - Added the required column `id_location_init` to the `lotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "id_location_init" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_location_init_fkey" FOREIGN KEY ("id_location_init") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
