import { getFilterTypeTotal } from "../../../../constants/getFilterTypeTotal";
import { Stats } from "../../../../constants/Stats";
import { prisma } from "../../../../database/prismaClient";

export class QtdPerPropagationUseCase {
  async execute({ filterType }: any) {
    let dates = getFilterTypeTotal(filterType);
    let itens = [];
    let names = [];
    let qtds = await prisma.lotes.groupBy({
      by: ["id_propagationType"],
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
      let name = await prisma.propagationType.findFirst({
        where: {
          id: {
            equals: qtd.id_propagationType,
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
