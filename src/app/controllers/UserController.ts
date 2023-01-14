import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { removeBlankSpaces } from '../../utils/removeBlankSpaces';
import { isValidUUID } from '../../utils/isValidUUID';

import UsersRepository from '../repositories/Users/Repository';

class UserController {
  async index(request: Request, response: Response) {
    const users = await UsersRepository.findAll();

    return response.status(200).json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const findUserById = await UsersRepository.findById(id);
    if (!findUserById) {
      return response.status(404).json({ error: 'User does not exists!' });
    }

    return response.status(200).json(findUserById);
  }

  async store(request: Request, response: Response) {
    const { name, surname, username, password } = request.body;

    const usernameAlreadyExists = await UsersRepository.findByUsername(username);
    if (usernameAlreadyExists) {
      return response.status(400).json({ error: 'Username already exists!'});
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!'});
    }

    if (!surname) {
      return response.status(400).json({ error: 'Surname is required!'});
    }

    if (!username) {
      return response.status(400).json({ error: 'Username is required!'});
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required!'});
    }


    const nameWithoutSpaces = removeBlankSpaces(name);
    const surnameWithoutSpaces = removeBlankSpaces(surname);
    const usernameWithoutSpaces = removeBlankSpaces(username);

    const hashedPassword = await bcrypt.hash(password, 8);

    const createdUser = await UsersRepository.create({
      name: nameWithoutSpaces,
      surname: surnameWithoutSpaces,
      username: usernameWithoutSpaces,
      hashedPassword,
    });

    return response.status(201).json(createdUser);
  }

  async update(request: Request, response: Response) {
    const { name, surname, username } = request.body;
    const { id } = request.params;

    if(!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const findUserById = await UsersRepository.findById(id);
    if (!findUserById) {
      return response.status(404).json({ error: 'User does not exists!' });
    }

    const usernameAlreadyExists = await UsersRepository.findByUsername(username);
    if (usernameAlreadyExists && usernameAlreadyExists.id !== id) {
      return response.status(400).json({ error: 'Username already exists!'});
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!'});
    }

    if (!surname) {
      return response.status(400).json({ error: 'Surname is required!'});
    }

    if (!username) {
      return response.status(400).json({ error: 'Username is required!'});
    }

    const nameWithoutSpaces = removeBlankSpaces(name);
    const surnameWithoutSpaces = removeBlankSpaces(surname);
    const usernameWithoutSpaces = removeBlankSpaces(username);

    await UsersRepository.update(id, {
      name: nameWithoutSpaces,
      surname: surnameWithoutSpaces,
      username: usernameWithoutSpaces,
      hashedPassword: findUserById.password
    });

    return response.sendStatus(204);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const findUserById = await UsersRepository.findById(id);
    if (!findUserById) {
      return response.status(404).json({ error: 'User does not exists!' });
    }


    await UsersRepository.delete(id);

    return response.sendStatus(204);
  }
}

export = new UserController();
