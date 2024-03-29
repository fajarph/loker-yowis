'use strict';

const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(sequelize.models.Job, { through: sequelize.models.UserJob });
    }
  }
  User.init({
    uuid: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    nohp: DataTypes.STRING,
    status: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    role: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => user.uuid = uuidv4());

  return User;
};