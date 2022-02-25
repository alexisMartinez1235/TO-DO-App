import express, { Request, Response } from 'express';
import LTaskM from '../Model/LTaskM';

const api = express.Router();
const ltaskM : LTaskM = new LTaskM();

api.post('/', (req : Request, res : Response) => {
//   const descr : string = req.body.descr.toString(); // "Ejemplo"
//   const date : Date = new Date(req.body.date); // "2020-03-07"
  const { id, description, expirationDate } = req.body;
  try {
    ltaskM.insertTask(id, description, expirationDate, res);
  }catch (err) {
    res.send({
      'Error': "Cannot connect to DB"
    });
  }
});

api.put('/logical', (req : Request, res : Response) => {
  const { id } = req.body;

  try {
    ltaskM.logicalDeleteTask(id, res);
  }catch (err) {
    res.send({
      'Error': 'Cannot connect to DB'
    });
  }
});

api.delete('/physical', (req : Request, res : Response) => {
  const { id } = req.body;

  ltaskM.physicalDeleteTask(id, res);
});

api.get('/', (req : Request, res : Response) => {
  const variable : string = req.query.variable?.toString() || 'ID'; // ID
  const order : string = req.query.order?.toString() || 'ASC'; // ASC | DESC
  // if (ltaskM.tryConnect()){
  try { 
    ltaskM.getTasks(variable, order, res);
  //}else {
  }catch (err) {
    res.send({
      'Error': "Cannot connect to DB"
    });
  }
});

export default api;
