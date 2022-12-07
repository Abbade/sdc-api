import { Stats } from "../../../../constants/Stats";
import { prisma } from "../../../../database/prismaClient";

export class QtdPerLoteUseCase {
  async execute({ filterType }: any) {
    let today = new Date();
    let initial = new Date();
    let final = new Date();

    switch (filterType) {
      case Stats.THIS_MONTH: {
        initial = new Date(today.getFullYear(), today.getMonth(), 1);
        final = new Date(today.getFullYear(), today.getMonth(), 31);
        break;
      }
      case Stats.THIS_YEAR: {
        initial = new Date(today.getFullYear(), 1, 1);
        final = new Date(today.getFullYear(), 12, 31);
        break;
      }
    }
    let itens = [];
    let names = [];
    let qtds = await prisma.lotes.groupBy({
      by: ["id_genetic"],
      where: {
        propDate: {
          gte: initial,
          lte: final,
        },
      },

      _sum: {
        qtProp: true,
      },
    });

    for (let qtd of qtds) {
      let qt = qtd._sum.qtProp;
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
