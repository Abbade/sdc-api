import { prisma } from '../../../../../database/prismaClient';

export interface ICreateSection {
  id?: number;
  name: string;
  description: string;
  id_user_create: number;
}

export class CreateTrashReasonUseCase {

  async execute({ name,description,id_user_create }: ICreateSection) {
    const client = await prisma.trashReasons.create({
      data: {
        name,
        description,
        id_user_create
      },
    });

    return client;
  }
}
