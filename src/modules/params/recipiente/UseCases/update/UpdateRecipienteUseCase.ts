import { prisma } from '../../../../../database/prismaClient';
import { ICreateRecipiente } from '../createRecipiente/CreateRecipienteUseCase';

export class UpdateRecipienteUseCase {
  
  async execute({  name,description, id}: ICreateRecipiente) {

    const updated = await prisma.recipientes.update({
      where: {
        id: id,
      },
      
      data: {
        name,
        description,
      }
    })

    return updated;
  }
}
