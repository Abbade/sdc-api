-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genetics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "id_profile" INTEGER NOT NULL,

    CONSTRAINT "Genetics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Genetics" ADD CONSTRAINT "Genetics_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
