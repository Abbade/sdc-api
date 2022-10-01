import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateUser {
  email: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ email, password }: IAuthenticateUser) {
    const user = await prisma.users.findFirst({
      where: {
        email ,
      },
    });

    if (!user) {
      throw new Error('email or password invalid!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('email or password invalid!');
    }

    const token = sign({ email }, '739f8ebd49733117a132c34fe866bc09', {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}
