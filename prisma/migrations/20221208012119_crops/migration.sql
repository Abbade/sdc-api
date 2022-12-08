/*
  Warnings:

  - You are about to drop the column `cropDriedMass` on the `Crops` table. All the data in the column will be lost.
  - You are about to drop the column `cropFullMass` on the `Crops` table. All the data in the column will be lost.
  - You are about to drop the column `cropWetMass` on the `Crops` table. All the data in the column will be lost.
  - You are about to drop the column `isTrashed` on the `Crops` table. All the data in the column will be lost.
  - You are about to drop the column `plantsQuantity` on the `Crops` table. All the data in the column will be lost.
  - Added the required column `id_fasesCrop` to the `Crops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crops" DROP COLUMN "cropDriedMass",
DROP COLUMN "cropFullMass",
DROP COLUMN "cropWetMass",
DROP COLUMN "isTrashed",
DROP COLUMN "plantsQuantity",
ADD COLUMN     "cropDriedFlowerMass" DOUBLE PRECISION,
ADD COLUMN     "cropDriedTrimMass" DOUBLE PRECISION,
ADD COLUMN     "cropFlowerWetMass" DOUBLE PRECISION,
ADD COLUMN     "cropFullDriedMass" DOUBLE PRECISION,
ADD COLUMN     "cropFullWetMass" DOUBLE PRECISION,
ADD COLUMN     "cropWetTrimMass" DOUBLE PRECISION,
ADD COLUMN     "id_fasesCrop" INTEGER NOT NULL,
ADD COLUMN     "qtPlants" INTEGER;

-- CreateTable
CREATE TABLE "fasesCrop" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "ordem" INTEGER,

    CONSTRAINT "fasesCrop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fasesCrop" ADD CONSTRAINT "fasesCrop_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crops" ADD CONSTRAINT "Crops_id_fasesCrop_fkey" FOREIGN KEY ("id_fasesCrop") REFERENCES "fasesCrop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
