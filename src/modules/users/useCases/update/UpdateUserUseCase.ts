import { prisma } from '../../../../database/prismaClient';
import { ICreateUser } from '../createUser/CreateUserUseCase';

export class UpdateUserUseCase {
  
  async execute({ name, email, id , id_role}: ICreateUser) {

    const updateUser = await prisma.users.update({
      where: {
        id: id,
      },
      
      data: {
        name: name,
        email: email,
        id_role: id_role       
      }
    })

    return updateUser;
  }
}
