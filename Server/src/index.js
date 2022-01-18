import express from 'express';
import LTaskM from './Model/LTaskM.js';

const app = express();
const port = 5000;

// https://www.youtube.com/watch?v=fi8-oz0AQGE&t=329s&ab_channel=VictorRoblesWEB
app.use(express.json());

// let MysqlConInstance = new MysqlCon();
let ltaskM = new LTaskM();


app.get('/', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  res.send('Successfully connected');
});

app.post('/createTask', (req, res) => {
  const descr = req.body.descr // "Ejemplo"
  const date = req.body.date // "2020-03-07"

  res.setHeader('Content-type', 'text/html');
  ltaskM.insertTask(descr, date, res);
});

app.post('/logicalDeleteTask', (req, res) => {
  const id = req.body.id;
  
  res.setHeader('Content-type', 'text/html');
  ltaskM.logicalDeleteTask(id, res);
});

app.post('/physicalDeleteTask', (req, res) => {
  const id = req.body.id;

  res.setHeader('Content-type', 'text/html');
  ltaskM.physicalDeleteTask(id, res);
});

app.get('/getTasks', (req, res) => {
  const variable = req.body.variable; // ID
  const order = req.body.order // ASC | DESC

  res.setHeader('Content-type', 'application/json');
  ltaskM.getTasks(variable, order, res);
});

app.listen(port, () => {
  console.log(`Server open at http://localhost:${port}/`)
});