-- AlterTable
ALTER TABLE "users" ADD COLUMN     "id_role" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
