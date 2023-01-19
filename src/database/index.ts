import { Client } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  user: 'root',
  database: 'alfhen',
  password: 'root',
  port: 5432,
  host: 'localhost',
});

client.connect();

export const query = async (query: string, values?: Array<string>) => {
  const { rows } = await client.query(query, values);
  return rows;
};
