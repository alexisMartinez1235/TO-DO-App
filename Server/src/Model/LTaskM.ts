import { Response } from 'express';
import MysqlCon from './MysqlCon';

class LTaskM extends MysqlCon {
  public getTasks(variable : string, order : string, res: Response) {
    this.connect();
    this.getPool().query(
      'SELECT * FROM TASK ORDER BY ? ?',
      [variable, order],
      // (err: any, result : any, fields : any) => {
      (err: any, result : any) => {
        if (err) {
          res.json({ error: err, success: false });
          throw err;
        }
        res.json({ data: result, success: true });
      },
    );
  }

  insertTask(taskName : string, expiration : Date, res: Response) {
    this.connect();
    this.getPool().query(
      'CALL INSERT_TASK(?,?)',
      [taskName, expiration],
      // (err : any, results : any, fields : any) => {
      (err : any, results : any) => {
        if (err) {
          res.json({ error: err, success: false });
          throw err;
        }
        res.json({ data: results.affectedRows, success: true });
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  modifyTask() {
    return 1;
  }

  logicalDeleteTask(id : number, res: Response) {
    this.connect();
    this.getPool().query(
      'CALL LOGICAL_DELETE_TASK(?)',
      [id],
      (err: any, results: any) => {
        // (err: any, results: any, fields: any) => {
        if (err) {
          res.json({ error: err, success: false });
          throw err;
        }
        res.json({ data: results.affectedRows, success: true });
      },
    );
  }

  physicalDeleteTask(id: number, res: Response) {
    this.connect();
    this.getPool().query(
      'CALL PHYSICAL_DELETE_TASK(?)',
      [id],
      (err: any, results: any) => {
        // (err: any, results: any, fields: any) => {
        if (err) {
          res.json({ error: err, success: false });
          throw err;
        }
        res.json({ data: results.affectedRows, success: true });
      },
    );
  }
}

// const LTaskMInstance = new LTaskM();
// Object.freeze(LTaskMInstance);
// export default LTaskMInstance;

export default LTaskM;
