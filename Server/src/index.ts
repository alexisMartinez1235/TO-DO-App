import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import taskRoute from './routes/task';

const app = express();
const port: number = 8000;

// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');//   // res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use('/task', taskRoute);

app.get('/', (req : Request, res: Response) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://reactapp:3000");
  res.send({
    data: 'Successfully connected _fsdfs',
  });
});

app.listen(port);
