import { hash } from "bcrypt";
import { Stats } from "../../../../constants/Stats";
import { prisma } from "../../../../database/prismaClient";
import { GetAllLotesController } from "../../../lotes/UseCases/getAllLotes/GetAllLotesController";

export class CreateTimeSeriesUseCase {
  async execute({ filterType }: any) {
    function getDaysInMonth(month: number, year: number) {
      var date = new Date(year, month, 1);
      var days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    }

    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let today = new Date();
    let initial = new Date();
    let final = new Date();
    let itens = [] as number[]

    switch (filterType) {
      case Stats.THIS_MONTH: {
        let days = getDaysInMonth(today.getMonth(), today.getFullYear());

        for(const day of days){
          let qtd = await prisma.lotes.groupBy({
            by: ['propDate'],
            where: { propDate: { equals: day } },
            _sum: {
              qtTotal: true,
            },
          });


          if(qtd[0] != undefined){
            
            let qt = qtd[0]._sum.qtTotal;

            if(qt != null){
              itens.push(qt);
            }
            else{
              itens.push(0);
            }
         
          }
          else{
            itens.push(0);
          }
        }
        return {
          x : days,
          y: itens
        }
      }
      case Stats.THIS_YEAR: {
        let i = 0;
        for(i = 0; i < 12 ; i++){
          initial = new Date(today.getFullYear(), i, 1);
          final = new Date(today.getFullYear(), i, 31);

    
          let qtds = await prisma.lotes.findMany({
            where: {
              propDate: {
                gte: initial,
                lte: final,
              },
            },
            select: {
              qtTotal: true
            }
          });
          let qtdTotal = 0;
          for(let qtd of qtds){
            if(qtd != null){
            
              let qt = qtd?.qtTotal
  
              if(qt != null){
                qtdTotal = qtdTotal + qt;
              }
     
            }
   
          }
          itens.push(qtdTotal);
          
        }
        return {
          x: months,
          y: itens
        }
      }
    }




    return {
      x: [],
      y: []
    };
  }
}
