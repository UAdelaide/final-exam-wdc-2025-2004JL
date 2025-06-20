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

//  /api/walkrequests/open
router.get('/walkrequests/open',(req,res) => {
    const sql = `
    SELECT WalkRequests.request_id,
    Dogs.name AS dog_name,
    WalkRequests.requested_time,
    WalkRequests.duration_minutes,
    WalkRequests.location,
    Users.username AS owner_username
    FROM WalkRequests
    JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
    JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE WalkRequests.status = 'open'`;

    database.query(sql,(err, results) => {
        if(err) {
            console.error('Error get  /api/walkrequests/open:', err);
            return res.status(500).json({error: 'failed to get walkrequests'});
        }
        res.json(results);
    });
});

//  /api/walkers/summary
router.get(' /walkers/summary',(req,res) => {
    const sql =`
    SELECT Users.username AS walker_username,
    COUNT(WalkRatings.rating_id) AS total_rating,
    AVG(WalkRatings.rating) AS average_rating,
    COUNT(CASE WHEN WalkRequests.status = 'completed' THEN 1 END) AS completed_walks
    FROM Users
    LEFT JOIN WalkRatings ON Users.user_id =WalkRatings.walker_id
    LEFT JOIN WalkRequests ON WalkRatings.request_id = WalkRequests.request_id
    WHERE Users.role = 'walker'
    GROUP BY Users.user_id`;

    database.query(sql, (err, results) => {
        if (err) {
            console
        }
    })
})

module.exports = router;