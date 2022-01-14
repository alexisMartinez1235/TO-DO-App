import MysqlCon from './MysqlCon.js';

class LTaskM extends MysqlCon {
  constructor(props) {
    super(props);

    this.getTasks = this.getTasks.bind(this);
    this.insertTask = this.insertTask.bind(this);
    this.logicalDeleteTask = this.logicalDeleteTask.bind(this);
    this.modifyTask = this.modifyTask.bind(this);
    this.physicalDeleteTask = this.physicalDeleteTask.bind(this);
  }
  getTasks(variable, order, res) {
    this.connect();
    this.getConnection().query(
      "SELECT * FROM TASK ORDER BY ? ?",
      [variable,order],
      (err, result, fields) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
      }
    );
  }
  insertTask(taskName, expiration, res) {
    this.connect();
    this.getConnection().query(
      "CALL INSERT_TASK(?,?)",
      [taskName, expiration],
      (err, results, fields) => {
        if (err) throw err;
        res.send(`Rows affected ${results.affectedRows}`);
      }    
    ); 
  }
  modifyTask(){
    return 1;
  }
  logicalDeleteTask(id, res){
    this.connect();
    this.getConnection().query(
      "CALL LOGICAL_DELETE_TASK(?)", 
      [id],
      (err, results, fields) => {
        if (err) throw err;
        res.send(`Rows affected ${results.affectedRows}`);
      }
    );
  } 
  physicalDeleteTask(id, res){
    this.connect();
    this.getConnection().query(
      "CALL PHYSICAL_DELETE_TASK(?)", 
      [id],
      (err, results, fields) => {
        if (err) throw err;
        res.send(`Rows affected ${results.affectedRows}`);
      }

    ); 
  } 
}


// const LTaskMInstance = new LTaskM();
// Object.freeze(LTaskMInstance);
// export default LTaskMInstance;
export default LTaskM;

