import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../utils/database';
import Person from './Person';
import List from './List';

class Task extends Model {
  // public modifyTask() {
  //   return 1;
  // }
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
    references: {
      model: Person,
      key: 'email',
    },
  },
  idList: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    references: {
      model: List,
      key: 'id',
    },
  },

}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'TASK', // We need to choose the model name
  timestamps: false, // disable creation date
});

Task.sync();

export default Task;
