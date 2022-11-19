import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetGeneticUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.genetics.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem Genética.');
    }


    return item;
  }
}
