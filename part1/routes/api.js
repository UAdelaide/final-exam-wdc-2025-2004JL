const express = require('express');
const router = express.Router();
const database = require('../db');

router.get('/dog',(req, res) => {
    const sql = `
    SELECT Dogs.name AS dog_name,
    Dogs.size,
    Users.username As owner_username
    FROM Dogs
    JOIN Users u ON d.owner_id = u.user_id`;
    
})