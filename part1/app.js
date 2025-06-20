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

        await database.execute(`
            INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
            ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
            ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, ' Beachside Ave', 'accepted'),
            ((SELECT dog_id FROM Dogs WHERE name = 'Jim'), '2025-06-11 10:00:00', 60, 'Paradise', 'open'),
            ((SELECT dog_id FROM Dogs WHERE name = 'Lucky'), '2025-06-12 15:00:00', 30, 'Central Park', 'open'),
            ((SELECT dog_id FROM Dogs WHERE name = 'Mike'), '2025-06-12 16:30:00', 40, 'Rundle Mall', 'cancelled');`
        );

        await database.execute(`
            INSERT INTO WalkRating (reques_id, walker_id, owner_id, rating, comments)
            VALUES
            ()`)
    }

}


module.exports = app;
