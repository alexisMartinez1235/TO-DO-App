import { Sequelize } from '@sequelize/core';
import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const sequelize = new Sequelize(
  process.env.MYSQL_DB || 'env db var not found',
  process.env.MYSQL_USER || 'env user var not found',
  fs.readFileSync('/run/secrets/mysql_db_pw', 'utf8').replace('\n', ''),
  {
    host: 'mysql',
    port: 3306,
    dialect: 'mysql',
    define: {
      freezeTableName: true, // for make singular table name
    },
  },
);
