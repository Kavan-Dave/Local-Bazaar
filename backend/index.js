// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/**
 * Core middleware
 * - JSON body parsing
 * - CORS for Vite dev server and optional public tunnels
 */
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',                 // Vite dev
      process.env.FRONTEND_ORIGIN || ''        // optional tunnel e.g., https://abc.ngrok-free.app
    ].filter(Boolean),
    credentials: true
  })
); // Proper CORS setup avoids blocked requests during local dev [web:200][web:190]

/**
 * Health endpoint
 */
app.get('/health', (req, res) => res.json({ ok: true })); // Simple JSON to verify server responds [web:190]

/**
 * Import routes
 * All routes must export an Express router.
 */
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const shopRoutes = require('./routes/shopRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes'); // Converts cart -> order(s)

/**
 * Mount routes
 * Keep the bases consistent with frontend service URLs.
 */
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/shops', shopRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes); // POST /checkout [web:110][web:261]

/**
 * Mongo connection
 */
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/localbazaar';
mongoose
  .connect(MONGO_URI, { autoIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message)); // Standard Mongoose connect pattern [web:190][web:262][web:260]

/**
 * Error fallbacks
 * - Not Found handler for unknown API paths
 * - Generic error handler to ensure JSON, not HTML, is returned
 */
app.use((req, res, next) => {
  if (req.path.startsWith('/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  next();
}); // Ensures unknown paths produce JSON (prevents HTML leaking to frontend) [web:190]

app.use((err, req, res, next) => {
  console.error('API Error:', err);
  const code = err.status || 500;
  res.status(code).json({ error: err.message || 'Server error' });
}); // Central JSON error handler [web:190]

/**
 * Start server
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)); // Conventional Express listen [web:190]
