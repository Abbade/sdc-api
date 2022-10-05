-- CreateTable
CREATE TABLE "lotes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user_create" INTEGER NOT NULL,
    "id_genetic" INTEGER NOT NULL,
    "total_clones" INTEGER NOT NULL,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_user_create_fkey" FOREIGN KEY ("id_user_create") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_genetic_fkey" FOREIGN KEY ("id_genetic") REFERENCES "genetics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
