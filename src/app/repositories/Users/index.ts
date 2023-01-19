import { User } from '../../../database/entities/User';

import { UserProps } from '../../../types/UserProps';

import { usersRepository } from './Repository';

class UsersRepository {
  findAll(): Promise<User[]> {
    const users = usersRepository.find();

    return users;
  }

  findById(id: string): Promise<User | null> {
    const user = usersRepository.findOneBy({ id });

    return user;
  }

  findByUsername(username: string): Promise<User | null> {
    const user = usersRepository.findOneBy({ username: username });

    return user;
  }

  async create({
    name,
    surname,
    username,
    hashedPassword
  }: UserProps): Promise<User> {
    const createdUser = usersRepository.create({
      name: name,
      surname: surname,
      username: username,
      password: hashedPassword,
    });

    await usersRepository.save(createdUser);

    return createdUser;
  }

  async update(id: string, {
    name,
    surname,
    username, }: UserProps) {
    const updatedUser = usersRepository.update(id, {
      name: name,
      surname: surname,
      username: username,
    });

    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = usersRepository.delete(id);

    return deletedUser;
  }
}

export default new UsersRepository();
