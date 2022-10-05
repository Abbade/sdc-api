import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ILocationFilter {
  name: string;
  description: string;

}

export class GetAllLocationsUseCase {
  
  async execute({ name,description }: ILocationFilter) {
    const locations = await prisma.locations.findMany();

    if (!locations) {
      throw new Error('Sem Profiles Existentes.');
    }


    return locations;
  }
}
