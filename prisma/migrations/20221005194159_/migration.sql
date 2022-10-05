/*
  Warnings:

  - A unique constraint covering the columns `[id_user_create]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_user_create_key" ON "organizations"("id_user_create");
