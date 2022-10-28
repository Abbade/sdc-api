import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetPropagationTypeUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.propagationType.findFirst({
      where: {
        id: {
          equals: id
        },

      }
    });
    if (!item) {
      throw new Error('Sem tipo de Propagações.');
    }


    return item;
  }
}
