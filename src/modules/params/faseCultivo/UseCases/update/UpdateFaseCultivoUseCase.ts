import { prisma } from '../../../../../database/prismaClient';
import { ICreateFaseCultivo } from '../createFaseCultivo/CreateFaseCultivoUseCase';

export class UpdateFaseCultivoUseCase {
  
  async execute({ name, description, ordem, id, duration}: ICreateFaseCultivo) {

    const updated = await prisma.fasesCultivo.update({
      where: {
        id: id,
      },
      
      data: {
        name: name,
        description: description,
        ordem: ordem,
        duration: duration,
      }
    })

    return updated;
  }
}
