import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ITrashReasonFilter {
  name: string;
  description: string;

}

export class GetAllTrashReasonsUseCase {
  
  async execute({ name,description }: ITrashReasonFilter) {
    const trashReasons = await prisma.trashReasons.findMany();

    if (!trashReasons) {
      throw new Error('Sem Profiles Existentes.');
    }


    return trashReasons;
  }
}
