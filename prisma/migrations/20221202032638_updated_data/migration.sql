/*
  Warnings:

  - You are about to drop the column `actionGroupCode` on the `actionPlants` table. All the data in the column will be lost.
  - You are about to drop the column `isScheduled` on the `actionPlants` table. All the data in the column will be lost.
  - You are about to drop the column `schedulingDate` on the `actionPlants` table. All the data in the column will be lost.
  - Added the required column `id_action` to the `actionPlants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_actionGroup` to the `actionPlants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "actionPlants" DROP COLUMN "actionGroupCode",
DROP COLUMN "isScheduled",
DROP COLUMN "schedulingDate",
ADD COLUMN     "id_action" INTEGER NOT NULL,
ADD COLUMN     "id_actionGroup" INTEGER NOT NULL,
ADD COLUMN     "id_faseCultivo_old" INTEGER,
ADD COLUMN     "id_location_old" INTEGER,
ADD COLUMN     "id_recipiente_old" INTEGER,
ALTER COLUMN "isCanceled" DROP DEFAULT,
ALTER COLUMN "completionDate" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ActionGroups" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obs" TEXT,

    CONSTRAINT "ActionGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionLotes" (
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
    "id_trashedLote" INTEGER,

    CONSTRAINT "ActionLotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActionGroups" ADD CONSTRAINT "ActionGroups_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_actionGroup_fkey" FOREIGN KEY ("id_actionGroup") REFERENCES "ActionGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_user_atribution_fkey" FOREIGN KEY ("id_user_atribution") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_action_fkey" FOREIGN KEY ("id_action") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_location_old_fkey" FOREIGN KEY ("id_location_old") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionLotes" ADD CONSTRAINT "ActionLotes_id_trashedLote_fkey" FOREIGN KEY ("id_trashedLote") REFERENCES "trashedLotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_actionGroup_fkey" FOREIGN KEY ("id_actionGroup") REFERENCES "ActionGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_action_fkey" FOREIGN KEY ("id_action") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_recipiente_old_fkey" FOREIGN KEY ("id_recipiente_old") REFERENCES "recipientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_faseCultivo_old_fkey" FOREIGN KEY ("id_faseCultivo_old") REFERENCES "fasesCultivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_location_old_fkey" FOREIGN KEY ("id_location_old") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
