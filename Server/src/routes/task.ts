import express, { Request, Response } from 'express';
import Task from '../model/Task';

const task = express.Router();

task.post('/', (req : Request, res : Response) => {
//   const descr : string = req.body.descr.toString(); // "Ejemplo"
//   const date : Date = new Date(req.body.date); // "2020-03-07"
  const { id, description, expirationDate } = req.body;
  Task.insertTask(id, description, expirationDate, res);
});

task.put('/logical', (req : Request, res : Response) => {
  const { id } = req.body;
  Task.logicalDeleteTask(id, res);
});

task.delete('/physical', (req : Request, res : Response) => {
  const { id } = req.body;
  Task.physicalDeleteTask(id, res);
});

task.get('/', (req : Request, res : Response) => {
  const variable : string = req.query.variable?.toString() || 'ID'; // ID
  const order : string = req.query.order?.toString() || 'ASC'; // ASC | DESC
  Task.getTasks(variable, order, res);
});

export default task;
