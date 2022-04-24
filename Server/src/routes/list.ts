import express, { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import List from '../model/List';
import task from './task';
import shareList from './shareList';
import { startTimer, stopTimer } from '../utils/metrics';
import PersonHasList from '../model/PersonHasList';
import Person from '../model/Person';
import { sequelize } from '../utils/database';
// import { databaseResponseTimeHistogram } from '../utils/metrics';

const list = express.Router();

// save email for services
list.use((req, _res, next) => {
  if (req.user instanceof Person) {
    req.app.locals.email = req.user.getDataValue('email');
  }
  next();
});

function searchList(req : Request, res : Response, next: any) {
  const idList: string | undefined = req.query.idList?.toString();
  
  if (idList !== undefined) {
    PersonHasList.findOne({
      where: { idList, emailPerson: req.app.locals.email },
    }).then((resList: List | null) => {
      req.app.locals.list = resList;
      // console.log(resList);
      next();
    })
      .catch((err: any) => {
        res.status(500).json({ data: err, success: false });
      });
  }
}

// routes
list.use('/task', searchList, task);
list.use('/share', searchList, shareList);

list.use(startTimer);

list.get('/', (req : Request, res : Response, next) => {
  const variable : string = req.query.variable?.toString() || 'id'; // ID, etc
  const order : string = req.query.order?.toString() || 'ASC'; // ASC | DESC
  const { email: myEmail } = req.app.locals;

  // startTimer(req);

  sequelize.query('SELECT * FROM `list` FULL JOIN `PERSON_HAS_LIST` ON id = `PERSON_HAS_LIST`.idList WHERE emailPerson=:myEmail ORDER BY :variable :order', {
    type: QueryTypes.SELECT,
    replacements: {
      myEmail,
      variable,
      order,
    },
  }).then((personHasList: any[]) => {
    req.app.locals.success = true;
    res.status(200).json({ data: personHasList, success: true });
    // stopTimer(req);
    next();
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

list.post('/', (req : Request, res : Response, next) => {
  const { listName } = req.body;
  
  List.create({
    listName, email: req.app.locals.email,
  }).then((listCreated: List) => {
    req.app.locals.success = true;
    PersonHasList.create({
      emailPerson: req.app.locals.email,
      idList: listCreated.getDataValue('id'),
      isOwner: true,
      canRead: true,
      canWrite: true,
    }).then((personHList: PersonHasList | null) => {
      res.status(200).json({
        data: [listCreated, personHList],
        success: true,
      });
      next();
    }).catch((err: any) => {
      res.status(500).json({
        data: err,
        success: false,
      });
    });
  }).catch((err: any) => {
    res.status(500).json({
      data: err,
      success: false,
    });
  });
});

list.put('/logical', (req : Request, res : Response, next) => {
  const { idList: id } = req.body;
  List.update(
    { inTrash: true },
    { where: { id } },
  ).then((results: any) => {
    req.app.locals.success = true;
    res.status(200).json({ data: results, success: true });
    next();
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

list.delete('/', (req : Request, res : Response, next) => {
  const { idList } = req.body;

  PersonHasList.destroy({
    where: { idList, emailPerson: req.app.locals.email },
  }).then(() => {
    List.destroy({ where: { id: idList } })
      .then((resultsListD: any) => {
        if (resultsListD === 0) return res.status(404).json({ data: resultsListD, success: false });
        req.app.locals.success = true;
        res.status(200).json({ data: resultsListD, success: true });
        return next();
      }).catch((err: any) => {
        res.status(500).json({ data: err, success: false });
      });
  }).catch((err: any) => {
    res.status(500).json({ data: err, success: false });
  });
});

// end timer for LIST db queries
list.use(stopTimer);

export default list;
