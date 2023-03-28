'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Educations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Educations.hasMany(models.Job)
      models.Job.belongsTo(Educations)
    }
  }
  Educations.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Educations',
  });
  return Educations;
};