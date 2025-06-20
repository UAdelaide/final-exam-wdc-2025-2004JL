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



module.exports = router;