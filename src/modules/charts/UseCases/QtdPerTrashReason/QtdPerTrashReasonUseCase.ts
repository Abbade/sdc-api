import { getFilterTypeTotal } from "../../../../constants/getFilterTypeTotal";
import { prisma } from "../../../../database/prismaClient";

export class QtdPerTrashReasonUseCase {
  async execute({ filterType }: any) {
    let dates = getFilterTypeTotal(filterType);
    let itens = [];
    let names = [];
    let qtds = await prisma.actionLotes.groupBy({
      by: ["id_trashReason"],
      where: {
        completionDate: {
          gte: dates.initial,
          lte: dates.final,
        },
        id_trashReason: {
          not: null
        }
      },

      _sum: {
        qt: true,
      },
    });

    for (let qtd of qtds) {
      let qt = qtd._sum.qt;
      let name = await prisma.trashReasons.findFirst({
        where: {
          id: {
            equals:  qtd.id_trashReason as number,
          },
        },
        select: {
          name: true,
        },
      });
      names.push(name?.name);
      if (qt != null) {
        itens.push(qt);
      } else {
        itens.push(0);
      }
    }

    return {
      x: names,
      y: itens,
    };
  }
}
