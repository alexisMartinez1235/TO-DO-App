import MysqlCon from './MysqlCon.js';

class LTaskM extends MysqlCon {
  constructor(props) {
    super(props);

    this.getTasks = this.getTasks.bind(this);
    this.insertTask = this.insertTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.modifyTask = this.modifyTask.bind(this);
  }
  getTasks(){
    this.connect();
    let rows = this.getConnection().query(
      "SELECT * FROM TASK",
      this.getRows
    ); 
    this.getConnection().end();
    return rows;
  }
  insertTask(taskName, expiration) {
    this.connect();
    let results = this.getConnection().query(
      "CALL INSERT_TASK(?,?)",
      [taskName, expiration],
      this.errorFunction 
    ); 
    this.getConnection().end();
    return results;
  }
  modifyTask(){
    return 1;

  }
  removeTask(id){
    this.connect();
    let results = this.getConnection().query(
      "CALL DELETE_TASK(?)", 
      [id],
      this.errorFunction 
    ); 
    this.getConnection().end();
    return results;
  }
 
}


// const LTaskMInstance = new LTaskM();
// Object.freeze(LTaskMInstance);
// export default LTaskMInstance;
export default LTaskM;

