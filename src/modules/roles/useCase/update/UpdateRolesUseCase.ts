import { prisma } from '../../../../database/prismaClient';
import { IRole } from '../create/CreateRoleUseCase';

export class UpdateRolesUseCase {
  
  async execute({ name, active, id , permissions}: IRole) {
    var perms =  permissions.map((x) => { return {id: x.id}});
    const updateUser = await prisma.roles.update({
      where: {
        id: id,
      },
      
      data: {
        name: name,
        active: active as boolean,

        permissions: {
          set: [],
          connect: perms
        },
        
        
      },

      include: {
        permissions: true
      }
    })

    return updateUser;
  }
}
