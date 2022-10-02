/*
  Warnings:

  - The primary key for the `clones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `clones` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id_user_create` on the `clones` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "clones" DROP CONSTRAINT "clones_id_user_create_fkey";

-- AlterTable
ALTER TABLE "clones" DROP CONSTRAINT "clones_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "id_user_create",
ADD COLUMN     "id_user_create" INTEGER NOT NULL,
ADD CONSTRAINT "clones_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "clones" ADD CONSTRAINT "clones_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
