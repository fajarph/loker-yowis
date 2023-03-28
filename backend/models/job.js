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
      Job.belongsTo(models.Location)
      models.Location.hasMany(Job)

      Job.belongsTo(models.Educations)
      models.Educations.hasMany(Job)

      Job.belongsTo(models.Level)
      models.Level.hasMany(Job)

      Job.belongsTo(models.Role)
      models.Role.hasMany(Job)
    }
  }
  Job.init({
    uuid: DataTypes.STRING,
    companyName: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    salary: DataTypes.STRING,
    jobType: DataTypes.STRING,
    jobShortDescription: DataTypes.STRING,
    jobLongDescription: DataTypes.STRING,
    industry: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    EducationId: DataTypes.INTEGER,
    LevelId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });

  Job.beforeCreate(job => job.uuid = uuidv4());

  return Job;
};