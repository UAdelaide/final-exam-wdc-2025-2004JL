const mysql = require('mysql2');

const database = mysql.createPool({
    // host: 'localhost',
    // user: 'webuser',
    // password: '123456',
    database: 'login'
});

module.exports = database;