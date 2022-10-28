/*
  Warnings:

  - You are about to drop the column `aclimatationName` on the `plantas` table. All the data in the column will be lost.
  - You are about to drop the column `floweringName` on the `plantas` table. All the data in the column will be lost.
  - You are about to drop the column `vegetationName` on the `plantas` table. All the data in the column will be lost.
  - You are about to drop the column `propDate` on the `trashedLotes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ordem]` on the table `fasesCultivo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ordem` on table `fasesCultivo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "fasesCultivo" ALTER COLUMN "ordem" SET NOT NULL;

-- AlterTable
ALTER TABLE "location" ADD COLUMN     "id_faseCultivo" INTEGER;

-- AlterTable
ALTER TABLE "plantas" DROP COLUMN "aclimatationName",
DROP COLUMN "floweringName",
DROP COLUMN "vegetationName",
ADD COLUMN     "aclimatationLocation" TEXT,
ADD COLUMN     "aclimatationRecipient" TEXT,
ADD COLUMN     "floweringLocation" TEXT,
ADD COLUMN     "floweringRecipient" TEXT,
ADD COLUMN     "lastTransplant" TIMESTAMP(3),
ADD COLUMN     "vegetation2Date" TIMESTAMP(3),
ADD COLUMN     "vegetation2Location" TEXT,
ADD COLUMN     "vegetation2Recipient" TEXT,
ADD COLUMN     "vegetation3Date" TIMESTAMP(3),
ADD COLUMN     "vegetation3Location" TEXT,
ADD COLUMN     "vegetation3Recipient" TEXT,
ADD COLUMN     "vegetationLocation" TEXT,
ADD COLUMN     "vegetationRecipient" TEXT;

-- AlterTable
ALTER TABLE "trashedLotes" DROP COLUMN "propDate";

-- CreateIndex
CREATE UNIQUE INDEX "fasesCultivo_ordem_key" ON "fasesCultivo"("ordem");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_id_faseCultivo_fkey" FOREIGN KEY ("id_faseCultivo") REFERENCES "fasesCultivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
