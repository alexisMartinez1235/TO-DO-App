import { DataTypes, Model } from '@sequelize/core';
import bcrypt from 'bcrypt';
import { sequelize } from '../utils/database';

class User extends Model {
  public static async hashPassword(pw: string): Promise<string> {
    return bcrypt.hashSync(pw, await bcrypt.genSalt(10));
  }
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'USER', // We need to choose the model name
  timestamps: false, // disable creation date
});

export default User;
