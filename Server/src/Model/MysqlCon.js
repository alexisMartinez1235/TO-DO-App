import mysql from 'mysql2';
import fs from 'fs';

const connectionVar = mysql.createConnection({
  host : 'mysqlDB',
  port: '3306',
  user: process.env.MYSQL_USER,
  database: 'db_todo',
  password: fs.readFileSync("/run/secrets/mysql_db_pw", 'utf8').replace('\n', "")
  // host : 'localhost',
  // ssl  : {
  //   ca : fs.readFileSync(__dirname + '/mysql-ca.crt')
  // }
});

class MysqlCon { 
  constructor(props) {
    this.props = props;
    this.connection= connectionVar;
    
    this.getConnection=this.getConnection.bind(this);
    this.connect=this.connect.bind(this);
    // this.getRows = this.getRows.bind(this);
    // this.errorFunction = this.errorFunction.bind(this);
  }
  connect() {
    this.getConnection().connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      // console.log('Connected to MySQL server.');
    });
  }
  getConnection(){
    return this.connection;
  }
}

/* #region  version with Singleton function */

// class MysqlCon {
//   static MysqlCon=null;
//   constructor(props){
//     this.props=props
//     // this.state={    }
//     // this.mysqlCon = null;
//   }
//   static Singleton(){
//     if ( this.MysqlCon === null || this.MysqlCon === undefined){
//       this.MysqlCon=mysql.createConnection({
//         // host : 'mysqlDB',
//         host: "192.168.0.2",
//         port : '3306',
//         user : process.env.MYSQL_USER,
//         // password :  this.getPassword()
//         password: this.getPassword()
//         // host : 'localhost',
//         // ssl  : {
//         //   ca : fs.readFileSync(__dirname + '/mysql-ca.crt')
//         // }
//       })
//     }
//     this.MysqlCon.connect((err) => {
//       if (err) throw err;
//       console.log("Connected to MySQL!");
//     });
//     return this.MysqlCon;
//   }
//   static getPassword(){
//     return fs.readFileSync("/run/secrets/mysql_db_pw", 'utf8').replace('\n',"");
//   }
// }
/* #endregion */

export default MysqlCon;

