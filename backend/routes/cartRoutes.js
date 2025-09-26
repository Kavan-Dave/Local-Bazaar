const express = require('express');
const router = express.Router();

const authenticated = require('../middleware/authenticated');     // attaches req.user { userId, role }
const roleCheck = require('../middleware/roleCheck');    // checks req.user.role
const Cart = require('../models/Cart');                  // Cart model per earlier schema
const Product = require('../models/Product');            // Product has price, shopId
const mongoose = require('mongoose');

// Helpers
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function recomputeSubTotal(cart) {
  cart.subTotal = cart.items.reduce((sum, i) => sum + i.total, 0);
  return cart.subTotal;
}

/**
 * GET /cart
 * Returns current user's cart with product and shop info populated.
 */
router.get(
  '/',
  authenticated,
  roleCheck('customer'),
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.userId })
        .populate({ path: 'items.productId', select: 'name price' })
        .populate({ path: 'items.shopId', select: 'name' });

      return res.json(cart || { items: [], subTotal: 0 });
    } catch (err) {
      console.error('Get cart error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * POST /cart/items
 * Body: { productId, quantity }
 * Adds quantity to an item (creates cart if none). Uses authoritative product price.
 */
router.post(
  '/items',
  authenticated,
  roleCheck('customer'),
  async (req, res) => {
    try {
      const { productId, quantity } = req.body || {};
      if (!isValidObjectId(productId) || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'productId must be valid and quantity must be > 0' });
      }

      const product = await Product.findById(productId).select('price shopId');
      if (!product) return res.status(404).json({ error: 'Product not found' });

      const userId = req.user.userId;
      let cart = await Cart.findOne({ userId });
      if (!cart) cart = new Cart({ userId, items: [], subTotal: 0 });

      const idx = cart.items.findIndex(i => i.productId.toString() === productId);
      if (idx > -1) {
        cart.items[idx].quantity += quantity;
        cart.items[idx].price = product.price;           // snapshot latest price
        cart.items[idx].shopId = product.shopId;
        cart.items[idx].total = cart.items[idx].quantity * cart.items[idx].price;
      } else {
        cart.items.push({
          productId,
          shopId: product.shopId,
          quantity,
          price: product.price,
          total: product.price * quantity
        });
      }

      recomputeSubTotal(cart);
      await cart.save();

      const populated = await cart.populate([
        { path: 'items.productId', select: 'name price' },
        { path: 'items.shopId', select: 'name' }
      ]);

      return res.json(populated);
    } catch (err) {
      console.error('Add to cart error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * PATCH /cart/items/:productId
 * Body: { quantity }
 * Sets exact quantity (0 removes the item). Refreshes price from Product.
 */
router.patch(
  '/items/:productId',
  authenticated,
  roleCheck('customer'),
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { quantity } = req.body || {};
      if (!isValidObjectId(productId) || !Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({ error: 'productId must be valid and quantity must be >= 0' });
      }

      const userId = req.user.userId;
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ error: 'Cart not found' });

      const idx = cart.items.findIndex(i => i.productId.toString() === productId);
      if (idx === -1) return res.status(404).json({ error: 'Item not in cart' });

      if (quantity === 0) {
        cart.items.splice(idx, 1);
      } else {
        const product = await Product.findById(productId).select('price shopId');
        if (!product) return res.status(404).json({ error: 'Product not found' });

        cart.items[idx].quantity = quantity;
        cart.items[idx].price = product.price;           // snapshot latest price
        cart.items[idx].shopId = product.shopId;
        cart.items[idx].total = quantity * product.price;
      }

      recomputeSubTotal(cart);
      await cart.save();

      const populated = await cart.populate([
        { path: 'items.productId', select: 'name price' },
        { path: 'items.shopId', select: 'name' }
      ]);

      return res.json(populated);
    } catch (err) {
      console.error('Set quantity error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * DELETE /cart/items/:productId
 * Removes one item from cart.
 */
router.delete(
  '/items/:productId',
  authenticated,
  roleCheck('customer'),
  async (req, res) => {
    try {
      const { productId } = req.params;
      if (!isValidObjectId(productId)) {
        return res.status(400).json({ error: 'Invalid productId' });
      }

      const userId = req.user.userId;
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ error: 'Cart not found' });

      const before = cart.items.length;
      cart.items = cart.items.filter(i => i.productId.toString() !== productId);
      if (cart.items.length === before) {
        return res.status(404).json({ error: 'Item not in cart' });
      }

      recomputeSubTotal(cart);
      await cart.save();

      const populated = await cart.populate([
        { path: 'items.productId', select: 'name price' },
        { path: 'items.shopId', select: 'name' }
      ]);

      return res.json(populated);
    } catch (err) {
      console.error('Remove item error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * DELETE /cart
 * Empties the cart completely.
 */
router.delete(
  '/',
  authenticated,
  roleCheck('customer'),
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.userId });
      if (!cart) return res.status(404).json({ error: 'Cart not found' });

      cart.items = [];
      cart.subTotal = 0;
      await cart.save();

      return res.json({ items: [], subTotal: 0 });
    } catch (err) {
      console.error('Empty cart error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
