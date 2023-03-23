'use strict';

const { v4: uuidv4 } = require('uuid');

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
    uuid: DataTypes.STRING,
    companyName: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    salary: DataTypes.STRING,
    jobRole: DataTypes.STRING,
    jobLevel: DataTypes.STRING,
    jobType: DataTypes.STRING,
    jobShortDescription: DataTypes.STRING,
    jobLongDescription: DataTypes.STRING,
    education: DataTypes.STRING,
    industry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });

  Job.beforeCreate(job => job.uuid = uuidv4());

  return Job;
};