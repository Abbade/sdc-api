import { prisma } from '../../../../../database/prismaClient';
import { ICreateSection } from '../createSection/CreateSectionUseCase';

export class UpdateSectionUseCase {
  
  async execute({ name, description, id}: ICreateSection) {

    const updated = await prisma.sections.update({
      where: {
        id: id,
      },
      
      data: {
        name,
        description,
      }
    })

    return updated;
  }
}
