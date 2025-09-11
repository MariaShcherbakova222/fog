// routes/articles.router.js
const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /api/articles - all articles
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, image, date, title, description 
      FROM articles 
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


