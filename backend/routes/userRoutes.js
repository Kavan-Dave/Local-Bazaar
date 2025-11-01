const express = require('express');
const User = require('../models/User');
const Shop = require('../models/Shop');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticated = require('../middleware/authenticated');
const roleCheck = require('../middleware/roleCheck');
const SECRET = 'AT_LOCAL';

// Get all users
router.get('/', authenticated, roleCheck('admin'), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user
router.get('/me', authenticated, async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Admin: get by id
router.get('/:id', authenticated, roleCheck('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Register user, auto-create shop for vendor (ownerId required)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'customer', shopName } = req.body || {};

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'name, email, password are required' });
    }
    if (!['customer', 'vendor', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    if (role === 'vendor') {
      if (!shopName || typeof shopName !== 'string' || !shopName.trim()) {
        return res.status(400).json({ error: 'Shop name is required for vendor' });
      }
      const shop = new Shop({
        name: shopName.trim(),
        ownerId: user._id, // IMPORTANT: your schema requires ownerId
      });
      await shop.save();
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update current user
router.put('/me', authenticated, async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', authenticated, roleCheck('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  next();
}

// Login user
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Incorrect Email' });
    }

    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      return res.status(400).json({ error: 'Password Incorrect' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'AT_LOCAL',
      { expiresIn: '1d' }
    );

    const { password: _, ...userData } = user.toObject();
    res.json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
