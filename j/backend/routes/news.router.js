// routes/news.router.js
const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /api/news - all news
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, image, date, title, description
      FROM news 
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/news/:id - single news item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT id, image, date, title, description 
      FROM news 
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


