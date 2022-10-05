/*
  Warnings:

  - You are about to drop the `Genetics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Genetics" DROP CONSTRAINT "Genetics_id_profile_fkey";

-- DropTable
DROP TABLE "Genetics";

-- DropTable
DROP TABLE "Profiles";

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genetics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_profile" INTEGER NOT NULL,

    CONSTRAINT "genetics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "genetics" ADD CONSTRAINT "genetics_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
