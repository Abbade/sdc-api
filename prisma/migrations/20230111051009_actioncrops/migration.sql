-- CreateTable
CREATE TABLE "actionCrop" (
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
    "id_crop" INTEGER NOT NULL,
    "id_location" INTEGER,
    "id_location_old" INTEGER,

    CONSTRAINT "actionCrop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_actionGroup_fkey" FOREIGN KEY ("id_actionGroup") REFERENCES "actionGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_user_atribution_fkey" FOREIGN KEY ("id_user_atribution") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_action_fkey" FOREIGN KEY ("id_action") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_crop_fkey" FOREIGN KEY ("id_crop") REFERENCES "Crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionCrop" ADD CONSTRAINT "actionCrop_id_location_old_fkey" FOREIGN KEY ("id_location_old") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
