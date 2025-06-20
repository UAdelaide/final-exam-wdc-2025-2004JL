const express = require('express');
const router = express.Router();
const database = require('../db');

router.get('/dog',(req, res) => {
    const sql = `
    SELECT Dogs.name AS dog_name,
    Dogs.size,
    Users.username As`
})