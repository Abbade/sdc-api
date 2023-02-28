import { Lotes } from "@prisma/client";
import { prisma } from "../../database/prismaClient";

export async function getLoteById(id: number): Promise<Lotes> {
    const lotes = await prisma.lotes.findFirst({
        where: {
            id: id,
        },
        include: {
            genetic: true,
            location: true,
            motherPlant: true

        },
    });

    if (!lotes) {
        throw new Error("Lote não encontrado.")
    }

    return lotes;
}