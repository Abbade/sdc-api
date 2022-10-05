import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ICreateLote {
name: string;
nick: string;
description: string
id_user_create: number;
}

export class CreateOrganizationUseCase {
  
  
  async execute({ name, nick, description, id_user_create }: ICreateLote) {

    //VALIDA CAMPOS

    const selectedOrganization = await prisma.organizations.findFirst({
      where: {
        name: {
          equals: name
        }
      }
    })

    if (selectedOrganization) {
      throw new Error('Nome de organização já existente: ' + name);
    }
    console.log(id_user_create)
    const user = await prisma.users.findFirst({
      where: {
        id: id_user_create
      }
    })

    if (!user) {
      throw new Error('Usuário não encontrado: ' + id_user_create);
    }

    const organization = await prisma.organizations.create({
      data: {
        name,
        nick,
        description,
        id_user_create

      },
    });

    if(!organization) {
      throw new Error('Erro ao criar organização.')
    }

    const userUpdate = await prisma.users.update({
      where: {id: id_user_create },
      data: {
        id_organization: organization.id
      }
    });

    if(!userUpdate) {
      throw new Error('Erro ao associar usuário a organização.')
    }


    return organization;
  }
}
