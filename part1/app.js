var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

const database =require('./db');

async function inputTestData() {
    try {
        await database.execute(`
            INSERT INTO Users (username, email, password_hash, role) VALUES
            ('alice123', 'alice@example.com', 'hashed123', 'owner'),
            ('bobwalker', 'bob@example.com', ' hashed456', 'walker'),
            ('carol123', 'carol@example.com', 'hashed789', 'owner'),
            ('ljl89', 'ljl@example.com', 'hashedabc', 'walker'),
            ('sun567', 'sun@example.com', 'hashedxyz', 'owner');
            `);

        await database.execute(`
            INSERT INTO Dogs (name, size, owner_id) VALUES
            ('Max', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),
            ('Bella', 'small', (SELECT user_id FROM Users WHERE username = 'carol123')),
            ('Jim', 'large', (SELECT user_id FROM Users WHERE username = 'alice123')),
            ('Mike', 'small', (SELECT user_id FROM Users WHERE username = 'sun567')),
            ('Lucky', 'medium', (SELECT user_id FROM Users WHERE username = 'sun567'));
            `);

        
    }

}


module.exports = app;
