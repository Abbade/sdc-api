import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ILocationFilter {
  name: string;
  description: string;

}

export class GetAllSectionsUseCase {
  
  async execute({ name,description }: ILocationFilter) {
    const sections = await prisma.sections.findMany({
      include: {locations: true}
    });

    if (!sections) {
      throw new Error('Sem Profiles Existentes.');
    }


    return sections;
  }
}
