import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface IProfileFilter {
  name: string;
  description: string;

}

export class GetAllProfilesUseCase {
  
  async execute({ name,description }: IProfileFilter) {
    const profiles = await prisma.profiles.findMany();

    if (!profiles) {
      throw new Error('Sem Profiles Existentes.');
    }


    return profiles;
  }
}
