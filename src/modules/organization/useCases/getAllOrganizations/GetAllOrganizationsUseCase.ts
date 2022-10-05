import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface IOrganizationsFilter {
  name: string;
  description: string;

}

export class GetAllOrganizationsUseCase {
  
  async execute({ name,description }: IOrganizationsFilter) {
    const lotes = await prisma.organizations.findMany({
      include: {
        users: true
        
      }
    });

    if (!lotes) {
      throw new Error('Sem Profiles Existentes.');
    }


    return lotes;
  }
}
