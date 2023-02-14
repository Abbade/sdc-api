/*
  Warnings:

  - Added the required column `endDate` to the `actionCrop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `actionCrop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `actionGroups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "actionCrop" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "actionGroups" ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "endDate" DROP DEFAULT,
ALTER COLUMN "startDate" DROP DEFAULT,
ALTER COLUMN "completionDate" DROP DEFAULT;
