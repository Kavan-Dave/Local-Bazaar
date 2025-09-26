const express = require('express');
const Product = require('../models/Product');
const authenticated = require('../middleware/authenticated');
const roleCheck = require('../middleware/roleCheck');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
const products = await Product.find();
res.json(products);
});

// Create a product
router.post('/', async (req, res) => {
try {
const product = await Product.create(req.body); // use Model.create
res.status(201).json(product);
} catch (err) {
res.status(400).json({ error: err.message });
}
});

// Bulk create
router.post('/bulk', async (req, res) => {
try {
const product = await Product.insertMany(req.body);
res.status(201).json(product);
} catch (err) {
res.status(400).json({ error: err.message });
}
});

router.get('/:id', async (req, res, next) => {
try {
const { id } = req.params;
if (!mongoose.isValidObjectId(id)) {
return res.status(400).json({ error: 'Invalid product id' });
}
const product = await Product.findById(id);
if (!product) return res.status(404).json({ error: 'Product not found' });
return res.json(product);
} catch (err) {
next(err);
}
});

// Update a product (by id)
router.put('/:id', authenticated, roleCheck('vendor'), async (req, res) => { // use PUT for update
try {
const product = await Product.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true } // return updated doc and validate
);
if (!product) return res.status(404).json({ error: 'Product not found' });
res.status(200).json(product);
} catch (err) {
res.status(400).json({ error: err.message });
}
});

router.delete('/:id', async (req, res) => {
try {
await Product.findByIdAndDelete(req.params.id);
res.json({ message: 'Product deleted' });
} catch (err) {
res.status(400).json({ error: err.message });
}
});

module.exports = router;