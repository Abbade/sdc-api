import { prisma } from '../../../../database/prismaClient';
import { IRole } from '../create/CreateRoleUseCase';

export class UpdateRolesUseCase {
  
  async execute({ name, active, id }: IRole) {

    const updateUser = await prisma.roles.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        active: active as boolean
      },
    })

    return updateUser;
  }
}
