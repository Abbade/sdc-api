/*
  Warnings:

  - Added the required column `id_tipo_fase_cultivo` to the `fasesCultivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fasesCultivo" ADD COLUMN     "id_tipo_fase_cultivo" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tipo_fase_cultivo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user_create" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tipo_fase_cultivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fasesCultivo" ADD CONSTRAINT "fasesCultivo_id_tipo_fase_cultivo_fkey" FOREIGN KEY ("id_tipo_fase_cultivo") REFERENCES "tipo_fase_cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_fase_cultivo" ADD CONSTRAINT "tipo_fase_cultivo_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
