import { DataTypes } from 'sequelize';
import db from '../utils/db.js';
import User from './User.model.js';

const Property = db.define('Property', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  location: DataTypes.STRING,
  price: DataTypes.FLOAT,
  image: DataTypes.STRING,
});

User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

export default Property;
