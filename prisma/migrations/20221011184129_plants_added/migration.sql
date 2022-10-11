/*
  Warnings:

  - Added the required column `id_planta` to the `trashedLotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propDate` to the `trashedLotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trashedLotes" ADD COLUMN     "id_planta" INTEGER NOT NULL,
ADD COLUMN     "propDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "qtPlantTrashed" INTEGER,
ALTER COLUMN "qtPropTrashed" DROP NOT NULL,
ALTER COLUMN "massTrashed" DROP NOT NULL;

-- CreateTable
CREATE TABLE "plantas" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obs" TEXT,
    "id_lote" INTEGER NOT NULL,
    "id_propagationType" INTEGER NOT NULL,
    "id_genetic" INTEGER NOT NULL,
    "id_location" INTEGER NOT NULL,
    "id_recipiente" INTEGER NOT NULL,
    "id_faseCultivo" INTEGER NOT NULL,
    "propDate" TIMESTAMP(3) NOT NULL,
    "propName" TEXT NOT NULL,
    "aclimatationDate" TIMESTAMP(3) NOT NULL,
    "aclimatationName" TEXT NOT NULL,
    "vegetationDate" TIMESTAMP(3),
    "vegetationName" TEXT,
    "floweringDate" TIMESTAMP(3),
    "floweringName" TEXT,
    "cropDate" TIMESTAMP(3),
    "cropName" TEXT,
    "trashDate" TIMESTAMP(3),
    "id_trashReason" INTEGER,

    CONSTRAINT "plantas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_propagationType_fkey" FOREIGN KEY ("id_propagationType") REFERENCES "propagationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_genetic_fkey" FOREIGN KEY ("id_genetic") REFERENCES "genetics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_recipiente_fkey" FOREIGN KEY ("id_recipiente") REFERENCES "recipientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_faseCultivo_fkey" FOREIGN KEY ("id_faseCultivo") REFERENCES "fasesCultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_trashReason_fkey" FOREIGN KEY ("id_trashReason") REFERENCES "trashReason"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trashedLotes" ADD CONSTRAINT "trashedLotes_id_planta_fkey" FOREIGN KEY ("id_planta") REFERENCES "plantas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
