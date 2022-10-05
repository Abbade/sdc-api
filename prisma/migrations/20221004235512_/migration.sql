/*
  Warnings:

  - You are about to drop the column `id_user_create` on the `lotes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "lotes" DROP CONSTRAINT "lotes_id_user_create_fkey";

-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "id_user_create";
