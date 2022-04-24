import cors from 'cors';
import express, { Request, Response } from 'express';
import responseTime from 'response-time';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import {
  startMetricsServer,
  restResponseTimeHistogram,
  // databaseResponseTimeHistorgram
} from './utils/metrics';
import routes from './routes/routes';
import { sequelize } from './utils/database';
import { sessionKey, sessionName } from './utils/keys';
import api from './routes/api';

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const engine = require('ejs-mate');

const app = express();
const port: number = 8000;

const sessionStore = new SequelizeStore({
  db: sequelize,
  // The interval at which to cleanup expired sessions in milliseconds. 60 minutes
  checkExpirationInterval: 6 * 60 * 60 * 1000,
  // The maximum age (in milliseconds) of a valid session. 4
  expiration: 4 * 60 * 60 * 1000,
});

require('./utils/local-auth');

// middlewares ------------------------
app.use(cors({
  credentials: true,
}));
app.use(morgan('dev')); // see debug in terminal
app.use(cookieParser());

// -- config session
app.use(
  session({
    secret: sessionKey,
    store: sessionStore,
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: false,
    },
  }),
);
sessionStore.sync(); // for create Sessions DB
//------------------------------------

app.use(flash()); // is after because use session as passport

// initialize passport ------------------
app.use(passport.initialize());
app.use(passport.session()); // config session for allow user identification

app.use(bodyParser.json()); // bodyParser manage request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// EJS config -----------------------
// -- assign views folder to express
app.set('views', path.join(__dirname, 'views'));

// -- settings engine template ejs
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// -- sleep server
app.use(rateLimit({
  windowMs: 1 * 3 * 1000, // 3 seconds
  max: 33, // Limit each IP to x requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    data: ['wait 3 seconds'],
    success: false,
  },
}));
app.use(morgan('dev')); // see debug in terminal
app.use(cookieParser());

// -- config session
app.use(
  session({
    secret: sessionKey,
    store: sessionStore,
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: true,
    },
  }),
);
sessionStore.sync(); // for create Sessions DB
//------------------------------------

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  console.log(req.flash());
  next();
});

// save metrics
app.use(responseTime((req: Request, res: Response, time: number) => {
  if (req?.route?.path) {
    restResponseTimeHistogram.observe({
      method: req.method,
      // route: req.route.path,
      route: req.originalUrl,
      status_code: res.statusCode,
    }, time);
    // }, time * 1000);
  }
}));

// routes
app.use('/api', api);
app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
  startMetricsServer();
});
