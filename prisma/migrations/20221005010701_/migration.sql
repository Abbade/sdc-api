/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `lotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lotes_name_key" ON "lotes"("name");
