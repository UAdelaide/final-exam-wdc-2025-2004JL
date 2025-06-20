const mysql = require('mysql2/promise');

const database = mysql.createPool({
    // host: 'localhost',
    // user: 'webuser',
    // password: '123456',
    database: 'DogWalkService'
});

module.exports = database;