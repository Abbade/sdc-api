import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetRecipienteUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.recipientes.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem Recipiente.');
    }


    return item;
  }
}
