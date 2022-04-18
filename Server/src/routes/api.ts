import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { userReg } from '../utils/local-auth';
import { sessionKey } from '../utils/keys';
import Person from '../model/Person';
import list from './list';
// import { startTimer } from '../utils/metrics';

function loggin(user: any, req: any, res: any, next: any) {
  req.login(user, { session: false }, async (errLogin: any) => {
    if (errLogin) return next(errLogin);

    // generate a signed son web token with the contents of
    //  user object and return it in the response
    const userRes = { _id: user.id, email: user.email };
    const token = jwt.sign({ person: userRes }, sessionKey, {
      expiresIn: 1 * 60 * 60 * 1000, // 1 hour
    });
    return res.json({
      data: {
        user: userRes,
        token,
      },
      success: true,
    });
  });
}

const api = express.Router();

api.get('/', (req, res) => {
  res.json({
    data: 'Successfully connected',
    success: true,
  });
});

api.post(
  '/signin',
  (req, res, next) => {
    passport.authenticate(userReg.localSignin, {
      session: false,
    }, async (err, user) => {
      if (err || !user) {
        res.json({
          data: 'Signin failture',
          success: false,
        });
        return next(err);
      }
      return loggin(user, req, res, next);
    })(req, res, next);
  },
);

api.post(
  '/signup',
  (req, res, next) => {
    passport.authenticate(userReg.localSignup, {
      session: false,
    }, async (err, user) => {
      if (err || !user) {
        res.json({
          data: 'Signup failture',
          success: false,
        });
        return next(err);
      }
      return loggin(user, req, res, next);
    })(req, res, next);
  },
);

api.use(passport.authenticate(userReg.tokenJWT, { session: false }));

//
// authenticated routes
//

api.get('/logout', (req, res) => {
  req.logOut();
  res.json({
    data: 'You have Log out',
    success: true,
  });
});

api.post(
  '/profile',
  (req, res) => {
    if (req.user instanceof Person) {
      res.json({
        data: {
          message: 'You already have to access to profile!',
          user: {
            id: req.user.getDataValue('id'),
            email: req.user.getDataValue('email'),
          },
          token: req.query.secret_token,
        },
        success: true,
      });
    }
  },
);

// start prometheus metric timer for db queries
// api.use(startTimer);

// routes of /api
api.use('/list', list);
// api.use('/user', personHasList);

export default api;
