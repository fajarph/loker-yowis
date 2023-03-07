'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    companyName: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    salery: DataTypes.STRING,
    jobRole: DataTypes.STRING,
    jobLevel: DataTypes.STRING,
    jobType: DataTypes.STRING,
    jobDescription: DataTypes.STRING,
    education: DataTypes.STRING,
    industry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};