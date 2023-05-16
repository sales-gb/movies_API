import path, { dirname } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const DataSourceConfig = (): DataSourceOptions => {
  const entitiesPath = path.join(__dirname, 'entities/**.{js,ts}');
  const migrationsPath = path.join(__dirname, 'migrations/**.{js,ts}');

  if (process.env.NODE_ENV === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('Env var DATABASE_URL does not exists');
  }

  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource: DataSource = new DataSource(DataSourceConfig());

export { AppDataSource };
