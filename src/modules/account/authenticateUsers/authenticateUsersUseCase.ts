import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateUser {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUser) {

    console.log(email);
    const user = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        }
      },
    });

    if (!user) {
      throw new Error('email or password invalid!');
    }
    console.log(password);
    console.log(user.password);


    const passwordMatch = await compare(password, user.password);

    console.log('ae')
    if (!passwordMatch) {
      throw new Error('email or password invalid!');
    }
    console.log('ae')
    const token = sign({ email , roles: ["administrador"], permissions: ["lote.list", "lote.create"] }, '739f8ebd49733117a132c34fe866bc09', {
      subject: user.id.toString(),
      expiresIn: '1d',
    });

    return { token, success: true, roles: ["administrador"], permissions: ["lote.list", "lote.create"] };
  }
}
