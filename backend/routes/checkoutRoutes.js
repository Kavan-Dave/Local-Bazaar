const express = require('express');
const router = express.Router();

const authenticated = require('../middleware/authenticated');
const roleCheck = require('../middleware/roleCheck');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');

router.post('/', authenticated, roleCheck('customer'), async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1) Load cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2) Group by shop
    const byShop = cart.items.reduce((acc, it) => {
      const k = it.shopId.toString();
      (acc[k] ||= []).push(it);
      return acc;
    }, {});

    const createdOrderIds = [];

    // 3-5) For each shop
    for (const [shopId, items] of Object.entries(byShop)) {
      const productIds = items.map(i => i.productId);

      const products = await Product.find({ _id: { $in: productIds } })
        .select('price stock shopId name');

      const pmap = new Map(products.map(p => [p._id.toString(), p]));

      let totalAmount = 0;
      const orderProducts = [];

      // Validate
      for (const line of items) {
        const p = pmap.get(line.productId.toString());
        if (!p) return res.status(400).json({ error: 'Product not found during checkout' });
        if (p.shopId.toString() !== shopId) {
          return res.status(400).json({ error: 'Product-shop mismatch' });
        }
        const available = Number.isFinite(p.stock) ? p.stock : 0;
        if (available < line.quantity) {
          return res.status(400).json({ error: `Insufficient stock for ${p.name}` });
        }
      }

      // Build order
      for (const line of items) {
        const p = pmap.get(line.productId.toString());
        const price = p.price;
        totalAmount += price * line.quantity;
        orderProducts.push({
          productId: p._id,
          quantity: line.quantity,
          price
        });
      }

      // Create order
      const order = await Order.create({
        customerId: userId,
        shopId,
        products: orderProducts,
        totalAmount,
        status: 'pending'
      });
      createdOrderIds.push(order._id);

      // Decrement stock
      for (const line of items) {
        const p = pmap.get(line.productId.toString());
        const newStock = Math.max(0, (Number.isFinite(p.stock) ? p.stock : 0) - line.quantity);
        await Product.updateOne({ _id: p._id }, { $set: { stock: newStock } });
      }
    }

    // 5) Clear cart
    cart.items = [];
    cart.subTotal = 0;
    await cart.save();

    // Populate for UI
    const populated = await Order.find({ _id: { $in: createdOrderIds } })
      .populate({ path: 'shopId', select: 'name' })
      .populate({ path: 'products.productId', select: 'name price' });

    return res.status(201).json({ orders: populated });
  } catch (err) {
    console.error('Checkout error (standalone mode):', err);
    return res.status(400).json({ error: err.message || 'Checkout failed' });
  }
});

module.exports = router;
