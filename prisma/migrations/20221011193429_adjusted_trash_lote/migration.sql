-- DropForeignKey
ALTER TABLE "trashedLotes" DROP CONSTRAINT "trashedLotes_id_lote_fkey";

-- DropForeignKey
ALTER TABLE "trashedLotes" DROP CONSTRAINT "trashedLotes_id_planta_fkey";

-- AlterTable
ALTER TABLE "trashedLotes" ALTER COLUMN "id_lote" DROP NOT NULL,
ALTER COLUMN "id_planta" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trashedLotes" ADD CONSTRAINT "trashedLotes_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trashedLotes" ADD CONSTRAINT "trashedLotes_id_planta_fkey" FOREIGN KEY ("id_planta") REFERENCES "plantas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
