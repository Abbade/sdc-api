import { prisma } from '../../../../database/prismaClient';

interface ICompany{
  id?: number;
  name: string;
  email: string;
}

export class UpdateCompanyUseCase {
  
  async execute({ name, email, id }: ICompany) {
    const updated = await prisma.company.update({
      where: {
        id: id,
      },
      
      data: {
        name: name,
        email: email   
      }
    })

    return updated;
  }
}
