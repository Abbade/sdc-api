import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetSectionUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.sections.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem Seção.');
    }


    return item;
  }
}
