import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

export interface IRole {
  id?: number;
  name: string;
  active: Boolean;
  permissions: IPermission[];
}
export interface IPermission{
  id: number;
  name: string;
  code: string;
}

export class CreatePropagationTypeUseCase {
  
  
  async execute({ id, name,active, permissions}: IRole) {
    var perms =  permissions.map((x) => { return {id: x.id}});
    // const clientExists = await prisma.propagationType.findFirst({
    //   where: {
    //     name: {
    //       equals: name,
    //       mode: 'insensitive'
    //     },
    //   },
    // });

    // if (clientExists) {
    //   throw new Error('Client already exists');
    // }

    const obj = await prisma.roles.create({
      data: {
        name,
        permissions: {
          connect: perms
        }
      },
      include: {
        permissions: true
      }
    });

    return obj;
  }
}
