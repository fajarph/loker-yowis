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
      Job.belongsTo(models.Educations)
      models.Educations.hasMany(Job)

      Job.belongsTo(models.Level)
      models.Level.hasMany(Job)

      Job.belongsTo(models.Role)
      models.Role.hasMany(Job)

      Job.belongsTo(models.Location)
      models.Location.hasMany(Job)

      Job.belongsToMany(sequelize.models.User, { through: sequelize.models.UserJob });
    }
  }
  Job.init({
    uuid: DataTypes.STRING,
    companyName: DataTypes.STRING,
    titleCompanny: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    salary: DataTypes.STRING,
    jobType: DataTypes.STRING,
    jobShortDescription: DataTypes.STRING,
    jobLongDescription: DataTypes.STRING,
    industry: DataTypes.STRING,
    EducationId: DataTypes.INTEGER,
    LevelId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });

  Job.beforeCreate(job => job.uuid = uuidv4());

  return Job;
};