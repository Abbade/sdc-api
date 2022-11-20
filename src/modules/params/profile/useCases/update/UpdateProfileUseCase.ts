import { prisma } from '../../../../../database/prismaClient';
import { ICreateProfile } from '../createProfile/CreateProfileUseCase';

export class UpdateProfileUseCase {
  
  async execute({ name, description, id}: ICreateProfile) {

    const updated = await prisma.profiles.update({
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
