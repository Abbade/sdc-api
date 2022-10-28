import { hash } from 'bcrypt';
import { prisma } from '../../../../../database/prismaClient';

interface ICreatePropagationType {
  id: number;
  name: string;
  description: string;
}

export class UpdatePropagationTypeUseCase {
  
  
  async execute({ name,description, id }: ICreatePropagationType) {

    const updateUser = await prisma.propagationType.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
      },
    })

    return updateUser;
  }
}
