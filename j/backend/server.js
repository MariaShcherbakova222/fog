// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Routes
const productRoutes = require('./routes/products.router');
const promotionRoutes = require('./routes/promotions.router');
const userRoutes = require('./routes/users.router');
const orderRoutes = require('./routes/orders.router');
const newsRoutes = require('./routes/news.router');
const articleRoutes = require('./routes/articles.router');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/articles', articleRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'j API is running!' });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});