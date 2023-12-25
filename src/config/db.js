const express = require('express');
const sql = require('mssql');
require('dotenv').config()

const config = {
    user: process.env.DATA_USER,
    password: process.env.DATA_PASSWORD,
    server: process.env.SERVER_NAME,
    database: process.env.DATABASE,
    dialect: process.env.DIALECT,
    port: parseInt(process.env.PORT_SQL, 10),
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}
sql.connect(config, (err) => {
    if (err) {
        console.error("Unable to connect to SQL Server: ", err)
    }
    else {
        console.log('Successfully connected to SQL Server');
    }
})

module.exports = sql;
