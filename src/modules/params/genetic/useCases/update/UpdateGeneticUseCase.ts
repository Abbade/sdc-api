import { prisma } from '../../../../../database/prismaClient';
import { ICreateGenetic } from '../createGenetic/CreateGeneticUseCase';

export class UpdateGeneticUseCase {
  
  async execute({ name, description, id_profile, nick, id}: ICreateGenetic) {

    const updated = await prisma.genetics.update({
      where: {
        id: id,
      },
      
      data: {
        name,
        description,
        id_profile,
        nick
      }
    })

    return updated;
  }
}
