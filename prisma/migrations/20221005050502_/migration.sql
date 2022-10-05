/*
  Warnings:

  - You are about to drop the `recipiente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "recipiente";

-- CreateTable
CREATE TABLE "recipientes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "recipientes_pkey" PRIMARY KEY ("id")
);
