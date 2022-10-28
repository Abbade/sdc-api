import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

export interface IRole {
  id?: number;
  name: string;
  active: Boolean;
}

export class CreatePropagationTypeUseCase {
  
  
  async execute({ id, name,active}: IRole) {
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
        name
      },
    });

    return obj;
  }
}
