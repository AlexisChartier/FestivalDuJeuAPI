require('dotenv').config()
const fs = require('fs')
const mysql = require('mysql2')
const path = require('path')

// get the ath to the certificate
const ca = path.resolve(__dirname, '../ssl/mysql-ca.pem')


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
                ca: fs.readFileSync(ca).toString()
            },
            connectTimeout: 20000
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }   
}