/*
  Warnings:

  - You are about to drop the `actionTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "actionTypes" DROP CONSTRAINT "actionTypes_id_user_create_fkey";

-- DropForeignKey
ALTER TABLE "actions" DROP CONSTRAINT "actions_id_actionType_fkey";

-- DropTable
DROP TABLE "actionTypes";

-- CreateTable
CREATE TABLE "action_types" (
    "id" SERIAL NOT NULL,
    "id_user_create" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "action_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "action_types_code_key" ON "action_types"("code");

-- AddForeignKey
ALTER TABLE "action_types" ADD CONSTRAINT "action_types_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_id_actionType_fkey" FOREIGN KEY ("id_actionType") REFERENCES "action_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
