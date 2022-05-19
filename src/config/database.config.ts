// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();
//
// const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST || '127.0.0.1',
//   port: parseInt(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || 'postgres',
//   database: process.env.DB_DATABASE || 'wof-local'
// };
//
// export default config;

import { registerAs } from '@nestjs/config';

const dbConfig = () => ({
  type: 'mongodb',
  url: process.env.URL_DB
});

export default registerAs('db', dbConfig);
