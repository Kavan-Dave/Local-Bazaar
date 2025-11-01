const express = require('express');
const mongoose = require('mongoose');

// IMPORTANT: require your actual model files
// If your files export model('Products') and model('Shops'), require those files:
const Products = require('../models/Product'); // model name: 'Products'
const Shops = require('../models/Shop');       // model name: 'Shops'

const authenticated = require('../middleware/authenticated');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Helper: normalize payload to stock
function normalizeStockPayload(body) {
  const payload = { ...body };
  // Backward-compat: if 'quantity' was used in forms, map it to 'stock'
  if (payload.quantity != null && payload.stock == null) {
    payload.stock = payload.quantity;
    delete payload.quantity;
  }
  // Ensure numeric stock if provided as string
  if (payload.stock != null) {
    const n = Number(payload.stock);
    payload.stock = Number.isFinite(n) && n >= 0 ? n : 0;
  }
  // Ensure numeric price if provided as string
  if (payload.price != null) {
    const p = Number(payload.price);
    payload.price = Number.isFinite(p) && p >= 0 ? p : 0;
  }
  return payload;
}

// Get all products (customer/public) with shop name
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.find().populate({ path: 'shopId', select: 'name' });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Vendor: products of my shop only
router.get('/mine', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const shop = await Shops.findOne({ ownerId: req.user.userId }).select('_id');
    if (!shop) return res.status(400).json({ error: 'No shop for this vendor' });

    const products = await Products.find({ shopId: shop._id }).populate({ path: 'shopId', select: 'name' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Product by id with shop name
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid product id' });
  }
  const product = await Products.findById(id).populate({ path: 'shopId', select: 'name' });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  return res.json(product);
});

// Create product — auto attach vendor's shopId
router.post('/', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const shop = await Shops.findOne({ ownerId: req.user.userId }).select('_id');
    if (!shop) return res.status(400).json({ error: 'No shop for this vendor' });

    const normalized = normalizeStockPayload(req.body);
    const payload = { ...normalized, shopId: shop._id };

    const product = await Products.create(payload);
    const populated = await Products.findById(product._id).populate({ path: 'shopId', select: 'name' });
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const shop = await Shops.findOne({ ownerId: req.user.userId }).select('_id');
    if (!shop) return res.status(400).json({ error: 'No shop for this vendor' });

    // Normalize, coerce, and whitelist fields
    const normalized = normalizeStockPayload(req.body);
    const updates = {};
    const allowed = ['name', 'description', 'price', 'image', 'category', 'stock'];
    for (const k of allowed) {
      if (normalized[k] != null) updates[k] = normalized[k];
    }

    const product = await Products.findOneAndUpdate(
      { _id: req.params.id, shopId: shop._id },
      updates,
      { new: true, runValidators: true }
    ).populate({ path: 'shopId', select: 'name' });

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete product — restrict to vendor's shop
router.delete('/:id', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    const shop = await Shops.findOne({ ownerId: req.user.userId }).select('_id');
    if (!shop) return res.status(400).json({ error: 'No shop for this vendor' });

    const deleted = await Products.findOneAndDelete({ _id: req.params.id, shopId: shop._id });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
