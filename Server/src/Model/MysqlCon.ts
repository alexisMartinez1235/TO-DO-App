import mysql, { ConnectionOptions } from 'mysql2';
import fs from 'fs';

const dbOptions: ConnectionOptions = {
  host: 'mysqlDB',
  port: 3306,
  user: process.env.MYSQL_USER,
  database: 'db_todo',
  password: fs.readFileSync('/run/secrets/mysql_db_pw', 'utf8').replace('\n', ''),
  // host : 'localhost',
  // ssl  : {
  //   ca : fs.readFileSync(__dirname + '/mysql-ca.crt')
  // }
};
const connectionVar : mysql.Connection = mysql.createConnection(dbOptions);

class MysqlCon {
  connection : mysql.Connection;

  constructor() {
    this.connection = connectionVar;
  }

  connect() {
    this.getConnection().connect((err) => {
      if (err) {
        console.error(`error: ${err.message}`);
      }
      // console.log('Connected to MySQL server.');
    });
  }

  getConnection() {
    return this.connection;
  }
}

export default MysqlCon;
