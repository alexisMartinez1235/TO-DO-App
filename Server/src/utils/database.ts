import { Sequelize } from '@sequelize/core';
import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const sequelize = new Sequelize(
  process.env.MYSQL_DB || '',
  process.env.MYSQL_USER || '',
  fs.readFileSync('/run/secrets/mysql_db_pw', 'utf8').replace('\n', ''),
  {
    host: 'mysql',
    port: 3306,
    dialect: 'mysql',
    define: {
      freezeTableName: true, // for make singular table name
      timestamps: false, // disable creation date
    },
  },
);
