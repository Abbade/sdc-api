-- AlterTable
ALTER TABLE "actions" ADD COLUMN     "id_actionGroup" INTEGER;

-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "id_recipiente" INTEGER;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_recipiente_fkey" FOREIGN KEY ("id_recipiente") REFERENCES "recipientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_id_actionGroup_fkey" FOREIGN KEY ("id_actionGroup") REFERENCES "actionGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
