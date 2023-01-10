import { query } from '../../database';

import { UserProps } from '../../types/UserProps';

class UsersRepository {
  async findAll() {
    const rows: Array<[UserProps]> = await query(`
      SELECT * FROM users
    `);

    return rows;
  }
  async create({ user_name, password }: UserProps) {
    const [row] = await query(`
      INSERT INTO users(user_name, password)
      VALUES ($1, $2)
      RETURNING *
      `, [user_name, password]
    );

    return row;
  }

  async update(id: string, { user_name, password }: UserProps) {
    const [row] = await query(`
      UPDATE users
      SET user_name = $1, password = $2
      WHERE id = $5
      RETURNING *
    `, [user_name, password]);

    return row;
  }

  async delete(id: string) {
    const deleteOp = await query(`
      DELETE FROM users WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

export = new UsersRepository();
