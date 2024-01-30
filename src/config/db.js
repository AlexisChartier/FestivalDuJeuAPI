require('dotenv').config()
const fs = require('fs')
const mysql = require('mysql2')

module.exports = {
    DB : process.env.DB_NAME, 
    USER : process.env.DB_USERNAME, 
    PASSWORD : process.env.DB_PASSWORD, 
    CONFIG :{
        host : process.env.DB_HOST,
        dialect : 'mysql',
        dialectModule: mysql,
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(process.env.MYSQL_ATTR_SSL_CA).toString()
            }
        }
    }   
}