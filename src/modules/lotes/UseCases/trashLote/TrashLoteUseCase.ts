import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ITrashLote {
idLote: number;
id_trashReason: number;
qtTrash: number;
trashDate: Date;
obs: string
}

export class TrashLoteUseCase {
  
  
  async execute({ idLote, id_trashReason,qtTrash, trashDate }: ITrashLote) {

    const selectedLote = await prisma.lotes.findFirst({
      where: {
        id: idLote
      }
    })

    if (!selectedLote) {
      throw new Error('Lote não existente: ' + idLote);
    }

    if ( selectedLote?.qtProp - qtTrash < 0) {
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
        id_lote:idLote,
        id_trashReason,
        qtPropTrashed: qtTrash

      }
    })

    return lote;
  }
}
