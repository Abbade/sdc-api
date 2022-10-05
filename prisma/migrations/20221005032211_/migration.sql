/*
  Warnings:

  - Added the required column `id_propagationType` to the `lotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obs` to the `trashedLotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "id_propagationType" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trashedLotes" ADD COLUMN     "obs" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "propagationType" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "propagationType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "propagationType_name_key" ON "propagationType"("name");

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_propagationType_fkey" FOREIGN KEY ("id_propagationType") REFERENCES "propagationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
