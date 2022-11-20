import { prisma } from '../../../../../database/prismaClient';
import { ICreateSection } from '../createTrashReason/CreateTrashReasonUseCase';

export class UpdateTrashReasonUseCase {
  
  async execute({ name, description, id}: ICreateSection) {

    const updated = await prisma.trashReasons.update({
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
