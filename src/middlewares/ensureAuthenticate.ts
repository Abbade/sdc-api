import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
  permissions: string[];
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response?.status(401)?.json({ message: 'Token missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const {sub, permissions} = verify(token, '739f8ebd49733117a132c34fe866bc09') as IPayload;

    request.permissions = permissions;
    request.id_user = Number.parseInt(sub);

    return next();
  } catch (error) {
    console.log(error)
    return response?.status(401)?.json({ message: 'Invalid token!' + token });
  }
}
