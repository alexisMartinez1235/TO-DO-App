import express from 'express';
import MysqlCon from './Model/MysqlCon.js';
import LTaskM from './Model/LTaskM.js';

const app = express();
const port = 5000;

// https://www.youtube.com/watch?v=fi8-oz0AQGE&t=329s&ab_channel=VictorRoblesWEB
app.use(express.json());

// let MysqlConInstance = new MysqlCon();
let ltaskM = new LTaskM();


app.get('/', (req, res) => {
  res.send('Successfully connected');
});
app.post('/createTask', (req, res) => {
  // req.body.descr="Ejemplo"
  // req.body.date="2020-03-07"
  let err = ltaskM.insertTask(req.body.descr, req.body.date);
  res.send(err);
});
app.get('/getTasks', (req, res) => {
  let rows= ltaskM.getTasks();
  res.send(`Total rows getted: ${rows}`);
});
// app.get('/getdata', (req, res) => {
//   res.send("dfasjkfdhajfañ");
//   console.log("executed")
// });

app.listen(port, () => {
  console.log(`Server open at http://localhost:${port}/`)
});