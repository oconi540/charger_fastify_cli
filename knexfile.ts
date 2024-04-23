import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL as string,
    },
    migrations: {
      directory: './dist/db/migrations'
    },
    seeds: {
      directory: './dist/db/seeds'
    },
  },
};

export default knexConfig;