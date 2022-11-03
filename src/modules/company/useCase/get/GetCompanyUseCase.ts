import { prisma } from '../../../../database/prismaClient';
import { IRetrieve } from '../../../../interfaces/IRetrieve';

export class GetCompanyUseCase {
  
  async execute({ id}: IRetrieve) {
    const item = await prisma.company.findFirst(
      {
        where: {
          id: {
            equals: id
          },
        }
      }
    );
    if (!item) {
      throw new Error('Sem Empresa.');
    }


    return item;
  }
}
