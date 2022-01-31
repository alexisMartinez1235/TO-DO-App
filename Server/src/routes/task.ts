import express, { Request, Response } from 'express';
import LTaskM from '../Model/LTaskM';

const api = express.Router();
const ltaskM : LTaskM = new LTaskM();


api.post('/create', (req : Request, res : Response) => {
//   const descr : string = req.body.descr.toString(); // "Ejemplo"
//   const date : Date = new Date(req.body.date); // "2020-03-07"
  const { descr, date } = req.body;

  ltaskM.insertTask(descr, date, res);
});

api.post('/logicalDelete', (req : Request, res : Response) => {
  const { id } = req.body.id;

  ltaskM.logicalDeleteTask(id, res);
});

api.post('/physicalDelete', (req : Request, res : Response) => {
  const { id } = req.body;

  ltaskM.physicalDeleteTask(id, res);
});

api.get('/get', (req : Request, res : Response) => {
  const variable : string = req.query.variable?.toString() || 'ID'; // ID
  const order : string = req.query.order?.toString() || 'ASC'; // ASC | DESC

  ltaskM.getTasks(variable, order, res);
});

export default api;
