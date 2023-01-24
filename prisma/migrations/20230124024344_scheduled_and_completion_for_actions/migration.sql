-- AlterTable
ALTER TABLE "actionCrop" ADD COLUMN     "id_user_completion" INTEGER,
ADD COLUMN     "scheduledDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "actionLotes" ADD COLUMN     "id_user_completion" INTEGER,
ADD COLUMN     "scheduledDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "actionPlants" ADD COLUMN     "id_user_completion" INTEGER,
ADD COLUMN     "scheduledDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "actions" ADD COLUMN     "actionDuration" INTEGER,
ADD COLUMN     "cancelationDate" TIMESTAMP(3),
ADD COLUMN     "completionDate" TIMESTAMP(3),
ADD COLUMN     "id_user_atribution" INTEGER,
ADD COLUMN     "id_user_completion" INTEGER,
ADD COLUMN     "isCanceled" BOOLEAN,
ADD COLUMN     "isCompleted" BOOLEAN,
ADD COLUMN     "scheduledDate" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_id_user_atribution_fkey" FOREIGN KEY ("id_user_atribution") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_id_user_completion_fkey" FOREIGN KEY ("id_user_completion") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionLotes" ADD CONSTRAINT "actionLotes_id_user_completion_fkey" FOREIGN KEY ("id_user_completion") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_user_completion_fkey" FOREIGN KEY ("id_user_completion") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_user_completion_fkey" FOREIGN KEY ("id_user_completion") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
