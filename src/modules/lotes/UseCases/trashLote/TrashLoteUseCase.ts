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

    //VALIDA EXISTENCIA DE CAMPOS
    const selectedLote = await prisma.lotes.findFirst({
      where: {
        id: idLote
      }
    })

    if (!selectedLote) {
      throw new Error('Lote não existente: ' + idLote);
    }

    const selectedTrashReason = await prisma.lotes.findFirst({
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

    const trashedLote = await prisma.trashedLotes.create({
      data: {
        trashDate,
        id_lote: idLote,
        id_trashReason,
        qtPropTrashed: qtTrash,
        obs,
        id_user_create

      }
    })

    return lote;
  }
}
