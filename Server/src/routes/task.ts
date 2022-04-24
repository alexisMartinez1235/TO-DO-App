import express, { Request, Response } from 'express';
import Task from '../model/Task';
import { startTimer, stopTimer } from '../utils/metrics';

const task = express.Router();

task.use(startTimer);

task.get('/', (req : Request, res : Response, next) => {
  const variable : string = req.query.variable?.toString() || 'ID'; // ID
  const order : string = req.query.order?.toString() || 'ASC'; // ASC | DESC  
  const { email, list } = req.app.locals;

  Task.findAll({
    order: [
      [variable, order],
    ],
    where: { email, idList: list.getDataValue('idList') },
  }).then((tasks: Task[]) => {
    req.app.locals.success = true;
    res.status(200).json({ data: tasks, success: true });
    next();
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

task.post('/', (req : Request, res : Response, next) => {
//   const description // "Ejemplo"
//   const expirationDate // "2020-03-07"
  const { description, expirationDate } = req.body;
  const { email, list } = req.app.locals;
  
  Task.create({
    description, expirationDate, email, idList: list.getDataValue('idList'),
  })
    .then((taskCreated: Task) => {
      req.app.locals.success = true;
      res.status(200).json({ data: taskCreated, success: true });
      next();
    }).catch((err: any) => {
      res.status(500).json({ data: err, success: false });
    });
});

task.put('/logical', (req : Request, res : Response, next) => {
  const { id } = req.body;
  const { list } = req.app.locals;

  Task.update(
    { activated: false },
    { where: { id, idList: list.getDataValue('idList') } },
  ).then((results: any) => {
    req.app.locals.success = true;
    res.status(200).json({ data: results, success: true });
    next();
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

task.delete('/', (req : Request, res : Response, next) => {
  const { id } = req.body;
  const { list } = req.app.locals;
  Task.destroy({ where: { id, idList: list.getDataValue('idList') } })
    .then((results: any) => {
      req.app.locals.success = true;
      res.status(200).json({ data: results, success: true });
      next();
    }).catch((err: any) => {
      res.status(500).json({ data: err, success: false });
    });
});

// end timer for db queries
task.use(stopTimer);

export default task;
