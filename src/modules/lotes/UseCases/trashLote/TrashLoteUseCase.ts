import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ITrashLote {
  idLote: number;
  id_trashReason: number;
  qtTrash: number;
  trashDate: Date;
  obs: string;
  id_user_create: number;
}

export class TrashLoteUseCase {


  async execute({ idLote, id_trashReason, qtTrash, trashDate, obs, id_user_create }: ITrashLote) {


    if (qtTrash < 0) {
      throw new Error('Quantidade não deve ser negativa: ' + qtTrash);
    }

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedLote = await prisma.lotes.findFirst({
      where: {
        id: idLote
      }
    })

    if (!selectedLote) {
      throw new Error('Lote não existente: ' + idLote);
    }

    const selectedTrashReason = await prisma.trashReasons.findFirst({
      where: {
        id: id_trashReason
      }
    })

    if (!selectedTrashReason) {
      throw new Error('Motivo de descarte não existente: ' + id_trashReason);
    }


    //VALIDA QUANTIDADE DE ESTACAS/SEEDLINGS
    if (selectedLote?.qtProp - qtTrash < 0) {
      throw new Error('Lote não tem recurso suficiente para descarte.: ' + selectedLote.qtProp);
    }




    const lote = await prisma.lotes.update({
      where: {
        id: idLote
      },
      data: {
        qtProp: selectedLote.qtProp - qtTrash,
        qtPropTrashed: selectedLote.qtPropTrashed + qtTrash
      }
    })

    const selectedAction = await prisma.actions.findFirst({
      where: {
        name: "Descartar mudas"
      }
    })

    if (!selectedAction) {
      throw new Error('Action para log não existente: ');
    }

    const newActionGroup = await (await prisma.actionGroups.create({
      data: {
        id_user_create: id_user_create,
        obs: obs
      }
    })).id

    const actionLote = await prisma.actionLotes.create({
      data: {
        id_lote: idLote,
        id_user_create: id_user_create,
        obs: obs,
        id_actionGroup: newActionGroup,

        status: "Completed",
        isCompleted: true,
        completionDate: trashDate,
        
        id_user_atribution: id_user_create,
        id_action: selectedAction.id,

        qt: qtTrash,
        id_trashReason: id_trashReason
      }
    })

    

    // const trashedLote = await prisma.actionLotes.create({
    //   data: {
    //     trashDate,
    //     id_lote: idLote,
    //     id_trashReason,
    //     qtPropTrashed: qtTrash,
    //     obs,
    //     id_user_create

    //   }
    // })

  

    return actionLote;
  }
}
