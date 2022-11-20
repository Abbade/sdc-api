import { prisma } from '../../../../../database/prismaClient';

export interface ICreateProfile {
  id?: number;
  name: string;
  description: string;
  id_user_create: number;

}

export class CreateProfileUseCase {

  async execute({ name, description, id_user_create }: ICreateProfile) {

    const client = await prisma.profiles.create({
      data: {
        name,
        description,
        id_user_create
      },
    });

    return client;
  }
}
