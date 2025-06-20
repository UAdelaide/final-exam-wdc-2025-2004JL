const mysql = require('mysql2/promise');

const database = mysql.createPool({
    database: 'DogWalkService'
});

module.exports = database;