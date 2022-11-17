-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "id_mother" INTEGER;

-- AlterTable
ALTER TABLE "plantas" ADD COLUMN     "id_crop" INTEGER,
ADD COLUMN     "id_mother" INTEGER,
ADD COLUMN     "isCropped" BOOLEAN DEFAULT false,
ADD COLUMN     "isMalePlant" BOOLEAN DEFAULT false,
ADD COLUMN     "isMotherPlant" BOOLEAN DEFAULT false,
ADD COLUMN     "isTrashed" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "Crops" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obs" TEXT,
    "id_location" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isTrashed" BOOLEAN NOT NULL DEFAULT false,
    "isStored" BOOLEAN NOT NULL DEFAULT false,
    "cropDate" TIMESTAMP(3) NOT NULL,
    "dryingStartDate" TIMESTAMP(3),
    "dryingEndDate" TIMESTAMP(3),
    "storageDate" TIMESTAMP(3),
    "plantsQuantity" INTEGER,
    "cropFullMass" DOUBLE PRECISION,
    "cropWetMass" DOUBLE PRECISION,
    "cropDriedMass" DOUBLE PRECISION,

    CONSTRAINT "Crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actionTypes" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "actionTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPlant" BOOLEAN NOT NULL DEFAULT true,
    "isLote" BOOLEAN NOT NULL DEFAULT true,
    "isCrop" BOOLEAN NOT NULL DEFAULT false,
    "id_actionType" INTEGER NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actionPlants" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "obs" TEXT,
    "status" TEXT NOT NULL,
    "actionGroupCode" TEXT NOT NULL,
    "id_user_atribution" INTEGER,
    "isCanceled" BOOLEAN DEFAULT false,
    "cancelationDate" TIMESTAMP(3),
    "isScheduled" BOOLEAN DEFAULT false,
    "schedulingDate" TIMESTAMP(3),
    "isCompleted" BOOLEAN,
    "completionDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_planta" INTEGER NOT NULL,
    "id_recipiente" INTEGER,
    "id_faseCultivo" INTEGER,
    "id_location" INTEGER,
    "id_trashReason" INTEGER,

    CONSTRAINT "actionPlants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_mother_fkey" FOREIGN KEY ("id_mother") REFERENCES "plantas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_mother_fkey" FOREIGN KEY ("id_mother") REFERENCES "plantas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantas" ADD CONSTRAINT "plantas_id_crop_fkey" FOREIGN KEY ("id_crop") REFERENCES "Crops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crops" ADD CONSTRAINT "Crops_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crops" ADD CONSTRAINT "Crops_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionTypes" ADD CONSTRAINT "actionTypes_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_id_actionType_fkey" FOREIGN KEY ("id_actionType") REFERENCES "actionTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_user_atribution_fkey" FOREIGN KEY ("id_user_atribution") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_planta_fkey" FOREIGN KEY ("id_planta") REFERENCES "plantas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_recipiente_fkey" FOREIGN KEY ("id_recipiente") REFERENCES "recipientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_faseCultivo_fkey" FOREIGN KEY ("id_faseCultivo") REFERENCES "fasesCultivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionPlants" ADD CONSTRAINT "actionPlants_id_trashReason_fkey" FOREIGN KEY ("id_trashReason") REFERENCES "trashReason"("id") ON DELETE SET NULL ON UPDATE CASCADE;
