import { prisma } from '../../../../database/prismaClient';
import { IRetrieve } from '../../../../interfaces/IRetrieve';

export class GetRoleUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.roles.findFirst({
      where: {
        id: {
          equals: id
        },
      },
      include: {
        permissions: true
      }
    });
    if (!item) {
      throw new Error('Sem Perfis.');
    }


    return item;
  }
}
