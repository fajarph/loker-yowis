'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const UserModel = require('./user')
const JobModel = require('./job')
const LocationModel = require('./location')
const EducationModel = require('./educations')
const LevelModel = require('./level')
const RoleModel = require('./role')
const UserJobModel = require('./userjob')

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user')(sequelize, Sequelize);

db.user = UserModel(sequelize, Sequelize)
db.job = JobModel(sequelize, Sequelize)
db.location = LocationModel(sequelize, Sequelize)
db.education = EducationModel(sequelize, Sequelize)
db.level = LevelModel(sequelize, Sequelize)
db.role = RoleModel(sequelize, Sequelize)
db.userjob = UserJobModel(sequelize, Sequelize)

module.exports = db;
