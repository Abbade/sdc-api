import { prisma } from '../../../../database/prismaClient';
import { IRetrieve } from '../../../../interfaces/IRetrieve';

export class GetUserUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.users.findFirst({
      where: {
        id: {
          equals: id
        },
      }
    });
    if (!item) {
      throw new Error('Sem Perfis.');
    }


    return item;
  }
}
