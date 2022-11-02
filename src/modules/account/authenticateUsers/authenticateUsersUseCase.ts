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
      include: {
        role: {

          include: {
            permissions: true
          }
        }
      }
    });

    if (!user) {
      throw new Error('email or password invalid!');
    }

    let perms =  user.role?.permissions.map(function(item) {
      return item['code'];
    });
    console.log(perms)

    const passwordMatch = await compare(password, user.password);

 
    if (!passwordMatch) {
      throw new Error('email or password invalid!');
    }

    const token = sign({ email , roles: [user.role?.name], permissions: perms }, '739f8ebd49733117a132c34fe866bc09', {
      subject: user.id.toString(),
      expiresIn: '1d',
    });

    return { token, success: true, roles: [user.role?.name], permissions: perms };
  }
}
