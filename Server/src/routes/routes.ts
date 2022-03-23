import express from 'express';
import passport from 'passport';
import User from '../model/User';
import { isAuthenticated, isUnauthenticated } from '../utils/authenticated';
import { userReg } from '../utils/local-auth';
import task from './task';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signup', isUnauthenticated, (req: any, res: any) => {
  res.render('signup');
});

router.post(
  '/signup',
  isUnauthenticated,
  (req, res, next) => {
    passport.authenticate(userReg.localSignup, {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      passReqToCallback: true,
      failureFlash: true,
    }, (err, user) => {
      if (err) return err;
      if (!user) return res.redirect('/signup');
      return req.logIn(user, (logInErr) => {
        if (logInErr) return logInErr;
        return req.session.save(() => res.redirect('/profile'));
      });
    })(req, res, next);
  },
);

router.get('/signin', isUnauthenticated, (req, res) => {
  res.render('signin');
});

router.post(
  '/signin',
  isUnauthenticated,
  (req, res, next) => {
    passport.authenticate(userReg.localSignin, {
      successRedirect: '/profile',
      failureRedirect: '/signin',
      passReqToCallback: true,
      failureFlash: true,
    }, (err, user) => {
      if (err) return err;
      if (!user) return res.redirect('/signin');
      return req.logIn(user, (logInErr) => {
        if (logInErr) return logInErr;
        return req.session.save(() => res.redirect('/profile'));
      });
    })(req, res, next);
  },
);

router.use(isAuthenticated); // authentificate before go to profile, logout, etc

router.get('/profile', (req, res) => {
  let email = '';
  if (req.user instanceof User) {
    email = req.user.getDataValue('email');
  }
  res.render('profile', { email });
});

router.get('/logout', (req, _res, next) => {
  req.logOut();
  next();
}, isAuthenticated);

// routes of /
router.use('/task', task);

export default router;
