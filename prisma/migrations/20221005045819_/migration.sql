-- CreateTable
CREATE TABLE "fasesCultivo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ordem" INTEGER,

    CONSTRAINT "fasesCultivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipiente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "recipiente_pkey" PRIMARY KEY ("id")
);
