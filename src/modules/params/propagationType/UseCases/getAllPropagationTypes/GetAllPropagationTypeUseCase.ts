import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface IPropagationTypeFilter {
  name: string;
  description: string;

}

export class GetAllPropagationTypeUseCase {
  
  async execute({ name,description }: IPropagationTypeFilter) {
    const trashReasons = await prisma.propagationType.findMany();

    if (!trashReasons) {
      throw new Error('Sem Profiles Existentes.');
    }


    return trashReasons;
  }
}
