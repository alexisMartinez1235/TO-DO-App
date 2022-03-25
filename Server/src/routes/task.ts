import express, { Request, Response } from 'express';
import Task from '../model/Task';
import Person from '../model/Person';

const task = express.Router();

task.use((req, res, next) => {
  if (req.user instanceof Person) {
    req.app.locals.email = req.user.getDataValue('email');
  }
  next();
});

task.post('/', (req : Request, res : Response) => {
//   const descr : string = req.body.descr.toString(); // "Ejemplo"
//   const date : Date = new Date(req.body.date); // "2020-03-07"
  const { id, description, expirationDate } = req.body;
  Task.insert(id, description, expirationDate, req.app.locals.email, res);
});

task.put('/logical', (req : Request, res : Response) => {
  const { id } = req.body;
  Task.logicalDelete(id, req.app.locals.email, res);
});

task.delete('/physical', (req : Request, res : Response) => {
  const { id } = req.body;
  Task.physicalDelete(id, req.app.locals.email, res);
});

task.get('/', (req : Request, res : Response) => {
  const variable : string = req.query.variable?.toString() || 'ID'; // ID
  const order : string = req.query.order?.toString() || 'ASC'; // ASC | DESC
  Task.get(variable, order, req.app.locals.email, res);
});

export default task;
