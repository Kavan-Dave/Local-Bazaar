const express = require('express');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const authenticated = require('../middleware/authenticated');
const roleCheck = require('../middleware/roleCheck');
const router = express.Router();

// Get all shops (admin)
router.get('/', authenticated, roleCheck('admin'), async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a shop by ID (admin)
router.get('/:id', authenticated, roleCheck('admin'), async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(404).json({ error: 'Shop not found' });
  }
});

// Vendor’s own shop
router.get('/me', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const shop = await Shop.findOne({ ownerId: req.user.userId }); // use ownerId
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(404).json({ error: 'Shop not found' });
  }
});

// Create a new shop (vendor)
router.post('/', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const shop = new Shop({ ...req.body, ownerId: req.user.userId }); // ensure ownership
    await shop.save();
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a shop (vendor)
router.put('/:id', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    if (shop.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    Object.assign(shop, req.body);
    await shop.save();
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a shop (admin or vendor owner)
router.delete('/:id', authenticated, roleCheck(['admin', 'vendor']), async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    if (req.user.role === 'vendor' && shop.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await Shop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shop deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product quantity for vendor-owned product
router.patch('/products/:productId/quantity', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(productId).populate('shopId');
    if (!product || !product.shopId) return res.status(404).json({ error: 'Product not found' });

    if (product.shopId.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    product.quantity = quantity;
    await product.save();
    res.json({ message: 'Quantity updated', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
