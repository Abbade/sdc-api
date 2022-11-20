import { prisma } from '../../../../../database/prismaClient';
import { ICreateGenetic } from '../createLocation/CreateLocationUseCase';

export class UpdateLocationUseCase {
  
  async execute({ name,description,id_section, id_faseCultivo, id}: ICreateGenetic) {

    const updated = await prisma.locations.update({
      where: {
        id: id,
      },
      
      data: {
        name,
        description,
        id_faseCultivo,
        id_section
      }
    })

    return updated;
  }
}
