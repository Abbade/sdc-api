import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetLocationUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.locations.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem Localizacao.');
    }


    return item;
  }
}
