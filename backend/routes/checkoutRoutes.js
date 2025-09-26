const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const authenticated = require('../middleware/authenticated');     // sets req.user = { userId, role }
const roleCheck = require('../middleware/roleCheck');    // roleCheck('customer')

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');               // your orderSchema model

// POST /checkout
router.post('/', authenticated, roleCheck('customer'), async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const userId = req.user.userId;

      // 1) Load cart
      const cart = await Cart.findOne({ userId }).session(session);
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      // 2) Group items by shopId to create one order per shop
      const byShop = cart.items.reduce((acc, it) => {
        const k = it.shopId.toString();
        (acc[k] ||= []).push(it);
        return acc;
      }, {});

      const createdOrders = [];

      // 3) For each shop, validate stock & price, create order, decrement inventory
      for (const [shopId, items] of Object.entries(byShop)) {
        const productIds = items.map(i => i.productId);
        const products = await Product.find({ _id: { $in: productIds } })
          .select('price quantity shopId')
          .session(session);

        const pmap = new Map(products.map(p => [p._id.toString(), p]));

        let totalAmount = 0;
        const orderProducts = [];

        for (const line of items) {
          const p = pmap.get(line.productId.toString());
          if (!p) throw new Error('Product not found during checkout');
          if (p.shopId.toString() !== shopId) throw new Error('Product-shop mismatch');
          if (p.quantity < line.quantity) throw new Error('Insufficient stock');

          const price = p.price; // authoritative price
          totalAmount += price * line.quantity;

          orderProducts.push({
            productId: p._id,
            quantity: line.quantity,
            price
          });

          // decrement stock
          p.quantity -= line.quantity;
          await p.save({ session });
        }

        // 4) Create the order
        const [order] = await Order.create([{
          customerId: userId,
          shopId,
          products: orderProducts,
          totalAmount,
          status: 'pending'
        }], { session });

        createdOrders.push(order);
      }

      // 5) Clear cart
      cart.items = [];
      cart.subTotal = 0;
      await cart.save({ session });

      return res.status(201).json({ orders: createdOrders });
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(400).json({ error: err.message || 'Checkout failed' });
  } finally {
    session.endSession();
  }
});

module.exports = router;
