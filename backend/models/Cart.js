// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // product reference [1]
  shopId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },    // shop reference for filtering at checkout [1]
  quantity:  { type: Number, required: true, min: 1 },                                 // positive quantities [5]
  price:     { type: Number, required: true },                                         // snapshot at add/update time [5]
  total:     { type: Number, required: true }                                          // quantity * price [5]
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // one cart per user [1]
  items:    { type: [cartItemSchema], default: [] },                                             // cart lines [5]
  subTotal: { type: Number, default: 0 }                                                         // sum of item totals [5]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
