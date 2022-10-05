/*
  Warnings:

  - You are about to drop the column `qtPropThrashed` on the `lotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "genetics" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "qtPropThrashed",
ADD COLUMN     "qtPropTrashed" INTEGER NOT NULL DEFAULT 0;
