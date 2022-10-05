/*
  Warnings:

  - Added the required column `id_user_create` to the `fasesCultivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `genetics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `lotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `propagationType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `recipientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `trashReason` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user_create` to the `trashedLotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fasesCultivo" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "genetics" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "location" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "propagationType" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "recipientes" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "section" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trashReason" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trashedLotes" ADD COLUMN     "id_user_create" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fasesCultivo" ADD CONSTRAINT "fasesCultivo_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipientes" ADD CONSTRAINT "recipientes_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genetics" ADD CONSTRAINT "genetics_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propagationType" ADD CONSTRAINT "propagationType_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trashReason" ADD CONSTRAINT "trashReason_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trashedLotes" ADD CONSTRAINT "trashedLotes_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
