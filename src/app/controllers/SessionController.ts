import { Request, Response } from 'express';

import UsersRepository from '../repositories/Users';

import bcrypt from 'bcrypt';
import AuthenticateService from '../service/AuthenticateService';

class SessionController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username) {
      return response.status(400).json({ error: 'Username is required!'});
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required!'});
    }

    const user = await UsersRepository.findByUsername(username);

    if (!user) {
      return response.status(400).json({ error: 'These credentials do not match an account in our system!' });
    }

    const isValidPassword = await bcrypt.compare(password, user?.password as string);
    if (!isValidPassword) {
      return response.status(400).json({ error: 'These credentials do not match an account in our system!' });
    }

    const authenticateInfo = await AuthenticateService.execute({ user, expiresIn: '4h' });

    response.send(authenticateInfo);
  }
}

export = new SessionController();
