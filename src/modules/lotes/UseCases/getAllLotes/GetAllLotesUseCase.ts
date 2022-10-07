import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ILoteFilter {
  name: string;
  description: string;

}

export class GetAllLotesUseCase {
  
  async execute({ name,description }: ILoteFilter) {
    const lotes = await prisma.lotes.findMany({
      include: {
        location: true,
        genetic: true,
        propagationType: true
        
      }
    });

    if (!lotes) {
      throw new Error('Sem Profiles Existentes.');
    }


    return lotes;
  }
}
