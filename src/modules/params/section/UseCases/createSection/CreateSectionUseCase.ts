import { prisma } from '../../../../../database/prismaClient';

export interface ICreateSection {
  id?: number;
  name: string;
  description: string;
  id_user_create: number;
}

export class CreateSectionUseCase { 
  async execute({ name,description,id_user_create }: ICreateSection) {

    const obj = await prisma.sections.create({
      data: {
        name,
        description,
        id_user_create
      },
    });

    return obj;
  }
}
