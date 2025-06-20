const express = require('express');
const router = express.Router();
const database = require('../db');

// /api/dogs
router.get('/dogs',(req, res) => {
    const sql = `
    SELECT Dogs.name AS dog_name,
    Dogs.size,
    Users.username As owner_username
    FROM Dogs
    JOIN Users ON Dogs.owner_id = Users.user_id`;

    database.query(sql,(err, results) => {
        if (err) {
            console.error('error:', err);
            return res.status(500).json({error:'failed to get dogs'});
        }
        res.json(results);
    });
});

//  /api/walkrequests/
router.get('/walkrequests/open',(req,res) => {
    const sql = `
    SELECT WalkRequests.request_id,
    Dogs.names AS dog_name,
    WalkRequests.requested_time,
    WalkRequests.duration_minutes,
    WalkRequests.location,
    User.username AS owner_username
    FROM`
})

module.exports = router;