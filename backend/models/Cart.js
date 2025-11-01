const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true }, // match model 'Products'
  shopId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Shops', required: true },    // match model 'Shops'
  quantity:  { type: Number, required: true, min: 1 },
  price:     { type: Number, required: true },
  total:     { type: Number, required: true }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, unique: true }, // match 'Users'
  items:    { type: [cartItemSchema], default: [] },
  subTotal: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
