// routes/promotions.router.js
const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /api/promotions - all promotions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, image, discount, price, original_price, title, rating 
      FROM promotions 
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/promotions/:id - single promotion
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT id, image, discount, price, original_price, title, rating 
      FROM promotions 
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


