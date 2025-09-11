// routes/orders.router.js
const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const jwt = require('jsonwebtoken');

// GET /api/orders - current user's orders
router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const userId = decoded.userId;
    const date = req.query.date || null;

    let query = 'SELECT * FROM orders WHERE user_id = $1';
    const params = [userId];

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      query += ' AND delivery_date >= $2 AND delivery_date < $3';
      params.push(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in GET /orders:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/all - all orders
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, user_id, items, status, total_price, 
        delivery_time, delivery_date, 
        settlement, street, house, apartment, additional, phone, 
        created_at 
      FROM orders 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /all:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/user/:userId - orders by user id
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`
      SELECT id, items, status, total_price, delivery_time, delivery_date, location, created_at 
      FROM orders 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/orders - create order
router.post('/', async (req, res) => {
  const { 
    items, 
    totalPrice, 
    date, 
    timeSlot, 
    settlement, 
    street, 
    house, 
    apartment, 
    additional, 
    phone 
  } = req.body;

  if (!items || !totalPrice || !date || !timeSlot || !settlement || !street || !phone) {
    return res.status(400).json({ error: 'Please fill all required fields' });
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        userId = decoded.userId;
      } catch (err) {
        console.warn('Invalid token, creating order without auth');
      }
    }

    const result = await pool.query(
      `INSERT INTO orders (
        user_id, items, total_price, delivery_date, delivery_time, 
        settlement, street, house, apartment, additional, phone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id`,
      [
        userId,
        JSON.stringify(items),
        totalPrice,
        date,
        timeSlot,
        settlement,
        street,
        house,
        apartment,
        additional,
        phone
      ]
    );

    res.status(201).json({ orderId: result.rows[0].id });
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ error: 'Could not create order' });
  }
});

// PATCH /api/orders/:id/status - update order status
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE orders SET status = $1 WHERE id = $2 RETURNING id, status`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error updating status' });
  }
});

module.exports = router;


