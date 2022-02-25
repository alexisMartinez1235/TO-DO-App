import { Response } from 'express';
import MysqlCon from './MysqlCon';

const tasks = {
  get: 'SELECT * FROM vtask ORDER BY ? ?',
  post: 'CALL INSERT_TASK(?,?,?)',
  deleteLogical: 'CALL LOGICAL_DELETE_TASK(?)',
  deletePhysical: 'CALL PHYSICAL_DELETE_TASK(?)',
};

class LTaskM extends MysqlCon {
  public getTasks(variable : string, order : string, res: Response) {
    this.tryConnect();
    this.getPool().query(
      tasks.get, 
      [variable, order],
      // (err: any, result : any, fields : any) => {
      (err: any, result : any) => {
        if (err) {
          res.json({ data: err, success: false });
          console.log(err);
        } else {
          res.json({ data: result, success: true });
        }
      },
    );
  }

  public insertTask(id: string, taskName : string, expiration : Date, res: Response) {
    this.tryConnect();
    this.getPool().query(
      tasks.post,
      [id, taskName, expiration],
      // (err : any, results : any, fields : any) => {
      (err : any, results : any) => {
        if (err) {
          res.json({ data: err, success: false });
          console.log(err);
        } else {
          res.json({ data: results.affectedRows, success: true });
        }
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public modifyTask() {
    return 1;
  }

  public logicalDeleteTask(id : string, res: Response) {
    this.tryConnect();
    this.getPool().query(
      tasks.deleteLogical,
      [id],
      (err: any, results: any) => {
        // (err: any, results: any, fields: any) => {
        if (err) {
          res.json({ data: err, success: false });
          console.log(err);
        } else {
          res.json({ data: results.affectedRows, success: true });
        }
      },
    );
  }

  public physicalDeleteTask(id: string, res: Response) {
    this.tryConnect();
    this.getPool().query(
      tasks.deletePhysical,
      [id],
      (err: any, results: any) => {
        // (err: any, results: any, fields: any) => {
        if (err) {
          res.json({ data: err, success: false });
          console.log(err);
        } else {
          res.json({ data: results.affectedRows, success: true });
        }
      },
    );
  }
}

// const LTaskMInstance = new LTaskM();
// Object.freeze(LTaskMInstance);
// export default LTaskMInstance;

export default LTaskM;
