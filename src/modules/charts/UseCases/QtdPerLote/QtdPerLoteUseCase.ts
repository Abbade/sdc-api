import { getFilterTypeTotal } from "../../../../constants/getFilterTypeTotal";
import { Stats } from "../../../../constants/Stats";
import { prisma } from "../../../../database/prismaClient";

export class QtdPerLoteUseCase {
  async execute({ filterType }: any) {
    let dates = getFilterTypeTotal(filterType);
    let itens = [];
    let names = [];
    let qtds = await prisma.lotes.groupBy({
      by: ["id_genetic"],
      where: {
        propDate: {
          gte: dates.initial,
          lte: dates.final,
        },
      },

      _sum: {
        qtTotal: true,
      },
    });

    for (let qtd of qtds) {
      let qt = qtd._sum.qtTotal;
      let nameGenetic = await prisma.genetics.findFirst({
        where: {
          id: {
            equals: qtd.id_genetic,
          },
        },
        select: {
          name: true,
        },
      });
      names.push(nameGenetic?.name);
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
