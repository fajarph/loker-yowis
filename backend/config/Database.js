const { Sequelize } = require("sequelize")

const db = new Sequelize('info_loker_by_yowis','postgres','27fajar03',{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = db;