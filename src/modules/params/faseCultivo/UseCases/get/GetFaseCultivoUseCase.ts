import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetFaseCultivoUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.fasesCultivo.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem fase Cultivo.');
    }


    return item;
  }
}
