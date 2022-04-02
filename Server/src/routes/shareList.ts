import express, { Request, Response } from 'express';
import PersonHasList from '../model/PersonHasList';
import { startTimer, stopTimer } from '../utils/metrics';
// import list from './list';

const shareList = express.Router();

// verifies user access to list
shareList.use((req, res, next) => {
  const { idList } = req.body;
  const { email: emailPerson } = req.app.locals;

  PersonHasList.findOne({
    where: { idList, emailPerson },
  }).then((personhList: PersonHasList | null) => {
    if (personhList !== null) return next();
    return res.status(200).json({ data: 'User dont have permissions to access to this list', success: false });
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

shareList.use(startTimer);

shareList.get('/', (req : Request, res : Response, next) => {
  const variable : string = req.query.variable?.toString() || 'emailPerson';
  const order : string = req.query.order?.toString() || 'ASC';
  const { idList } = req.body;

  PersonHasList.findAll({
    // attributes: ['emailPerson'],
    order: [
      [variable, order],
    ],
    where: { idList },
  }).then((personhList: PersonHasList[]) => {
    req.app.locals.success = true;
    res.status(200).json({ data: personhList, success: true });
    next();
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

// verifies owner permissions
shareList.use((req, res, next) => {
  const { idList, email } = req.body;
  const { email: emailPerson } = req.app.locals;

  PersonHasList.findOne({
    where: { idList, emailPerson },
  }).then((personhList: PersonHasList | null) => {
    if ((personhList !== null && personhList.getDataValue('isOwner')) || email === emailPerson) return next();
    return res.status(200).json({ data: 'User dont have owner permissions', success: false });
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

shareList.post('/', (req : Request, res : Response, next) => {
  const {
    email: emailPerson,
    idList,
    isOwner,
    canRead,
    canWrite,
  } = req.body;

  PersonHasList.create({
    emailPerson, idList, isOwner, canRead, canWrite,
  })
    .then((personhList: PersonHasList) => {
      req.app.locals.success = true;
      res.status(200).json({ data: personhList, success: true });
      next();
    }).catch((err: any) => {
      res.status(500).json({ data: err, success: false });
    });
});

shareList.delete('/', (req : Request, res : Response, next) => {
  const { email: emailPerson, idList } = req.body;

  PersonHasList.destroy({ where: { emailPerson, idList } })
    .then((results: any) => {
      req.app.locals.success = true;
      res.status(200).json({ data: results, success: true });
      next();
    }).catch((err: any) => {
      res.status(500).json({ data: err, success: false });
    });
});

shareList.use(stopTimer);

export default shareList;
