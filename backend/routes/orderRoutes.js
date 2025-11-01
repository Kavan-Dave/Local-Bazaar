const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const roleCheck = require('../middleware/roleCheck');
const authenticated = require('../middleware/authenticated');
const Shop = require('../models/Shop');


// Get all orders for shops owned by current vendor (VENDOR DASHBOARD)
router.get('/shoporders', authenticated, roleCheck('vendor'), async (req, res) => {
  try {
    // Step 1: find all shop IDs owned by vendor
    const shops = await Shop.find({ ownerId: req.user.userId }).select('_id name');
    const shopIds = shops.map(shop => shop._id);

    // Step 2: find all orders for these shops
    const orders = await Order.find({ shopId: { $in: shopIds } })
      .populate({ path: 'customerId', select: 'name email' })
      .populate({ path: 'products.productId', select: 'name price' })
      .populate({ path: 'shopId', select: 'name' })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', authenticated, roleCheck('customer'), async (req, res) => {
  try {
    const id = req.user.userId;
    const orders = await Order.find({ customerId: id })
      .sort({ createdAt: -1 })
      .populate({ path: 'shopId', select: 'name' })
      .populate({ path: 'products.productId', select: 'name price' });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (current customer)
router.get('/', authenticated, async (req, res) => {
  try {
    const id = req.user.userId;
    const orders = await Order.find({ customerId: id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Create a new order
router.post('/', authenticated, async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order (e.g., status)
router.put('/:id', authenticated, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an order (only customer's pending orders)
router.delete('/:id', authenticated, roleCheck('customer'), async (req, res) => {
  try {
    const customerId = req.user.userId;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status === 'pending' && order.customerId.toString() === customerId) {
      await Order.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Order deleted' });
    }
    return res.status(200).json({ message: 'Too late to delete the order' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// order history of current customer
router.get('/me/history', authenticated, roleCheck('customer'), async (req, res) => {
  try {
    const id = req.user.userId;
    const order = await Order.find({ customerId: id }).sort({ createdAt: -1 });
    if (!order || order.length === 0) {
      return res.status(200).json({ message: 'No Order History' });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error('GET /:id/history error:', err);
    res.status(500).json({ error: 'Error occured' });
  }
});

// pending orders of the customer (allow customer or vendor)
router.get('/pending', authenticated, roleCheck(['customer', 'vendor']), async (req, res) => {
  try {
    const id = req.user.userId;
    const orders = await Order.find({ customerId: id, status: 'pending' });
    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: 'No orders Pending :)' });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Some error occured' });
  }
});

// customer’s order history for a specific shop
router.get('/:shopId/orders/history', authenticated, roleCheck('customer'), async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const customerId = req.user.userId;
    const orders = await Order.find({ customerId, shopId }).sort({ createdAt: -1 });
    if (!orders.length) {
      return res.json({ message: 'No order history for this shop.' });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// vendor actions: accept / status update
router.patch('/:orderId/accept', authenticated, roleCheck('vendor'), async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate('shopId');
  if (order.shopId.ownerId.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  order.status = 'processing';
  await order.save();
  res.json({ message: 'Order accepted', order });
});

router.patch('/:orderId/status', authenticated, roleCheck('vendor'), async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.orderId).populate('shopId');
  if (order.shopId.ownerId.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  order.status = status;
  await order.save();
  res.json({ message: 'Order status updated', order });
});

module.exports = router;
