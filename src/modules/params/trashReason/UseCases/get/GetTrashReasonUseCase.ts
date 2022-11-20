import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetTrashReasonUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.trashReasons.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem Motivo Descarte.');
    }


    return item;
  }
}
