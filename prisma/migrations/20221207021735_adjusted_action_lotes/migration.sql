/*
  Warnings:

  - You are about to drop the `ActionGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActionLotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActionGroups" DROP CONSTRAINT "ActionGroups_id_user_create_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_actionGroup_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_action_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_location_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_location_old_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_lote_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_trashedLote_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_user_atribution_fkey";

-- DropForeignKey
ALTER TABLE "ActionLotes" DROP CONSTRAINT "ActionLotes_id_user_create_fkey";

-- DropForeignKey
ALTER TABLE "actionPlants" DROP CONSTRAINT "actionPlants_id_actionGroup_fkey";

-- DropTable
DROP TABLE "ActionGroups";

-- DropTable
DROP TABLE "ActionLotes";

-- CreateTable
CREATE TABLE "fertilizer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user_create" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "fertilizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actionGroups" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obs" TEXT,

    CONSTRAINT "actionGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actionLotes" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obs" TEXT,
    "status" TEXT NOT NULL,
    "id_actionGroup" INTEGER NOT NULL,
    "id_user_atribution" INTEGER,
    "isCanceled" BOOLEAN,
    "cancelationDate" TIMESTAMP(3),
    "isCompleted" BOOLEAN,
    "completionDate" TIMESTAMP(3),
    "id_action" INTEGER NOT NULL,
    "id_lote" INTEGER NOT NULL,
    "id_location" INTEGER,
    "id_location_old" INTEGER,
    "qt" INTEGER NOT NULL,
    "id_trashReason" INTEGER,

    CONSTRAINT "actionLotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fertilizer" ADD CONSTRAINT "fertilizer_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionGroups" ADD CONSTRAINT "actionGroups_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_actionGroup_fkey" FOREIGN KEY ("id_actionGroup") REFERENCES "actionGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_user_atribution_fkey" FOREIGN KEY ("id_user_atribution") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_action_fkey" FOREIGN KEY ("id_action") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_location_old_fkey" FOREIGN KEY ("id_location_old") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_trashReason_fkey" FOREIGN KEY ("id_trashReason") REFERENCES "trashReason"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_actionGroup_fkey" FOREIGN KEY ("id_actionGroup") REFERENCES "actionGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
