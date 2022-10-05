-- CreateTable
CREATE TABLE "trashedLotes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_lote" INTEGER NOT NULL,
    "trashDate" TIMESTAMP(3) NOT NULL,
    "qtPropTrashed" INTEGER NOT NULL,

    CONSTRAINT "trashedLotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trashedLotes" ADD CONSTRAINT "trashedLotes_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
