import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';

class UserController {
  async index(request: Request, response: Response) {
    const users = await UsersRepository.findAll();

    return response.status(200).json(users);
  }
}

export = new UserController();
