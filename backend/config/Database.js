const { Sequelize } = require("sequelize")
require('dotenv').config()

const { NODE_ENV, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: NODE_ENV === 'production'
    }
})

module.exports = db;