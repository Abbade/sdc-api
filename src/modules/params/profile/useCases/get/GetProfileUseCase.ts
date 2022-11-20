import { prisma } from '../../../../../database/prismaClient';
import { IRetrieve } from '../../../../../interfaces/IRetrieve';

export class GetProfileUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.profiles.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem Perfil Genético.');
    }


    return item;
  }
}
