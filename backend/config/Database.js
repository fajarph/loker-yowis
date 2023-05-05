const { Sequelize } = require("sequelize")
require('dotenv').config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    connectionString: process.env.NODE_ENV || 'postgresql://postgres:<27fajar03>@localhost:5432/<info_loker_by_yowis>',
    ssl: process.env.NODE_ENV ? true : false
    
})

module.exports = db;