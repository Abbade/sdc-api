/*
  Warnings:

  - Added the required column `id_trashReason` to the `trashedLotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trashedLotes" ADD COLUMN     "id_trashReason" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "trashReason" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "trashReason_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trashReason_name_key" ON "trashReason"("name");

-- AddForeignKey
ALTER TABLE "trashedLotes" ADD CONSTRAINT "trashedLotes_id_trashReason_fkey" FOREIGN KEY ("id_trashReason") REFERENCES "trashReason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
