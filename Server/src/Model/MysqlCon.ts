import mysql, {
   PoolOptions,
   Pool,
   PoolConnection
} from 'mysql2';
import fs from 'fs';

const dbOptions: PoolOptions = {
  host: 'mysqlDB',
  port: 3306,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: fs.readFileSync('/run/secrets/mysql_db_pw', 'utf8').replace('\n', ''),
  connectionLimit : 10,
  multipleStatements: true
  // host : 'localhost',
  // ssl  : {
  //   ca : fs.readFileSync(__dirname + '/mysql-ca.crt')
  // }
};

const pool : Pool = mysql.createPool(dbOptions);

class MysqlCon {
  private connectionPool : mysql.Pool;

  constructor() {
    this.connectionPool = pool;
  }

  public tryConnect() : boolean {
    let response=true;
    // return 1;
    this.getPool().getConnection((err : NodeJS.ErrnoException, con : PoolConnection): void => {
      if (err) {
        console.error(`error: ${err.message}`);
        response=false;
      }
      console.log('Connected to MySQL server.');
    });
    return response
  }

  protected getPool() : Pool {
    return this.connectionPool;
  }
  // public getPromisePool() : mysql.Pool {
  //   return this.getPool();
  // }
}

export default MysqlCon;

