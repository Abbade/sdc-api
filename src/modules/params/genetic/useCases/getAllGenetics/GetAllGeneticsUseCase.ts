import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface IGeneticFilter {
  name: string;
  description: string;

}

export class GetAllGeneticsUseCase {
  
  async execute({ name,description }: IGeneticFilter) {
    const genetics = await prisma.genetics.findMany();

    if (!genetics) {
      throw new Error('Sem Profiles Existentes.');
    }


    return genetics;
  }
}
