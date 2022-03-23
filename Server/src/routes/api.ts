// import express from 'express';
import express from 'express';
import passport from 'passport';
// import taskRoute from './task';
import jwt from 'jsonwebtoken';
import { isAuthenticatedJSON, isUnauthenticatedJSON } from '../utils/authenticated';
import { userReg } from '../utils/local-auth';
import task from './task';
import { sessionName } from '../utils/keys';

const api = express.Router();

api.get('/', (req, res) => {
  res.json({
    data: 'Successfully connected',
    success: true,
  });
});

api.post(
  '/signin',
  isUnauthenticatedJSON,
  (req, res, next) => {
    passport.authenticate(userReg.localSignin, {
      session: false,
    }, async (err, user) => {
      if (err || !user) next(err);

      req.login(user, { session: false }, async (errLogin) => {
        // if (errLogin) res.send(errLogin);
        if (errLogin) return next(errLogin);
        // generate a signed son web token with the contents of
        //  user object and return it in the response
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, sessionName);
        return res.json({
          body,
          token,
          success: true,
        });
      });
    })(req, res);
  },
);

api.post(
  '/signup',
  isUnauthenticatedJSON,
  passport.authenticate(userReg.localSignup, { session: false }),
  async (req, res) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);

api.use(passport.authenticate(userReg.tokenJWT, { session: false }));

api.use((req, res, next) => {
  isAuthenticatedJSON(req, res, next);
}); // authentificate before go to profile

api.get('/logout', (req, res) => {
  req.logOut();
  res.json({
    data: 'you have Log out',
    success: true,
  });
});

api.post(
  '/profile',
  passport.authenticate(userReg.tokenJWT, { session: false }),
  (req, res) => {
    res.json({
      data: 'You already have to access to profile!',
      success: true,
      user: req.user,
      token: req.query.secret_token,
    });
  },
);

api.use('/task', task);

// app.get('/', (req, res) => {
// });

// module.exports = router;
export default api;
