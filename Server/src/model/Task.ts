import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../utils/database';

class Task extends Model {
  public static get(variable : string, orderBy : string, email: string, res: any) {
    Task.findAll({
      order: [
        [variable, orderBy],
      ],
      where: { email },
    }).then((tasks: Task[]) => {
      res.json({ data: tasks, success: true });
    }).catch((err: any) => {
      res.json({ data: err, success: false });
      console.log(err);
    });
  }

  public static insert(
    id: string,
    description : string,
    expirationDate : Date,
    email: string,
    res: any,
  ) {
    Task.create({
      id, description, expirationDate, email,
    })
      .then((results: any) => {
        res.json({ data: results.affectedRows, success: true });
      }).catch((err: any) => {
        res.json({ data: err, success: false });
        console.log(err);
      });
  }

  // // eslint-disable-next-line class-methods-use-this
  // public modifyTask() {
  //   return 1;
  // }
  public static logicalDelete(id : string, email: string, res: any) {
    Task.update(
      { activated: false },
      { where: { id, email } },
    ).then((results: any) => {
      res.json({ data: results.affectedRows, success: true });
    }).catch((err: any) => {
      res.json({ data: err, success: false });
      console.log(err);
    });
  }

  public static physicalDelete(id: string, email: string, res: any) {
    Task.destroy({ where: { id, email } })
      .then((results: any) => {
        res.json({ data: results.affectedRows, success: true });
      }).catch((err: any) => {
        res.json({ data: err, success: false });
        console.log(err);
      });
  }
}

Task.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  activated: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'TASK', // We need to choose the model name
  timestamps: false, // disable creation date
});

export default Task;
