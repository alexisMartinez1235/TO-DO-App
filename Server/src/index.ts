import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import taskRoute from './routes/task';
import {
  startMetricsServer,
  restResponseTimeHistorgram,
  // databaseResponseTimeHistorgram
} from './utils/metrics';

import responseTime from 'response-time';
import rateLimit from 'express-rate-limit';

const app = express();
const port: number = 8000;
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));

app.use(rateLimit({
  windowMs: 1 * 7 * 1000, // 1 second
  max: 5, // Limit each IP to x requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    data: [],
    success: false,
  },
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(responseTime((req: Request, res: Response, time: number) => {
  if(req?.route?.path){
    restResponseTimeHistorgram.observe({
      method: req.method,
      route: req.route.path,
      status_code: req.statusCode
    }, time * 1000);
  }

}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');//   // res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/tasks', taskRoute);

app.get('/', (req : Request, res: Response) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://reactapp:3000");
  res.send({
    data: 'Successfully connected',
  });
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
  startMetricsServer();
});
