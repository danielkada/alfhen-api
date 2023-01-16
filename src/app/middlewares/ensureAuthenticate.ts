import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';

import UsersRepository from '../repositories/Users';

const secretKey = process.env.SECRET_KEY as string;

export default async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return response.status(400).json({ error: 'Token is required' });
  }

  const decodedToken: { exp: number } = decode(token);

  const currentDate = Date.now();
  const isExpiredToken = decodedToken.exp <= Math.floor(currentDate / 1000);

  if (isExpiredToken) {
    return response.status(401).json({ error: 'JWT expired'});
  }

  try {
    const { sub: id } = jwt.verify(token, secretKey);

    const user = await UsersRepository.findById(id as string);
    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    request.user = {
      id: id as string,
    };

    return next();
  } catch (error) {
    console.log('errrror', error);
    return response.sendStatus(401);

  }

}
