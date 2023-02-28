/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `action_types` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `action_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "action_types" ADD COLUMN     "type" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "action_types_type_key" ON "action_types"("type");
