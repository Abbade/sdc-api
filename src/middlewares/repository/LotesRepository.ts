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

    return lotes;
}