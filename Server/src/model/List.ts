import { DataTypes, Model } from '@sequelize/core';
import { sequelize } from '../utils/database';
// import PersonHasList from './PersonHasList';
// import Person from './Person';

class List extends Model {
}

List.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  listName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  // email: {
  //   type: DataTypes.STRING(30),
  //   allowNull: false,
  //   references: {
  //     model: Person,
  //     key: 'email',
  //   },
  // },
  inTrash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'LIST', // We need to choose the model name
  timestamps: false, // disable creation date
});

List.sync();

export default List;
