const express = require('express');
const router = express.Router();
const db = require('../models/db');
const session = require('express-session')

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username , password_hash, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // stundent add
    // save user information into session
    const user = rows[0];

    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role
    };

    res.json({
      message:'login sucessful',
      user: req.session.user
    });
  }catch (error) {
    res.status(500).json({error:'login failed'});
  }
});

// question 14
// student add logout
router.post('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) {
    return res.status(500).json({error: 'logout failed'});
    }
    res.clearCookie('connect.sid');
    res.json({message:'Logout sucessful'});
  });
});

// question 15
// student add mydog router
router.get('/mydogs', async(req,res) => {
  try {
    const [rows] = await db.query(`
      `)
  }
})

module.exports = router;