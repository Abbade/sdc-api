import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface IRecipientesFilter {
  name: string;
  description: string;

}

export class GetAllRecipientesUseCase {
  
  async execute({ name,description }: IRecipientesFilter) {
    const trashReasons = await prisma.recipientes.findMany();

    if (!trashReasons) {
      throw new Error('Sem Profiles Existentes.');
    }


    return trashReasons;
  }
}
