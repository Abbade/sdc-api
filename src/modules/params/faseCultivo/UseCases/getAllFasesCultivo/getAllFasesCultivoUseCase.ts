import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface IFasesCultivoFilter {
  name: string;
  description: string;

}

export class GetAllFasesCultivoUseCase {
  
  async execute({ name,description }: IFasesCultivoFilter) {
    const trashReasons = await prisma.fasesCultivo.findMany();

    if (!trashReasons) {
      throw new Error('Sem Fases de Cultivo Existentes.');
    }


    return trashReasons;
  }
}
