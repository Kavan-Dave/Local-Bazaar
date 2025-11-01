const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },    // match 'Users'
  shopId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Shops', required: true },    // match 'Shops'
  products:   [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true }, // match 'Products'
      quantity:  { type: Number, required: true, min: 1 },
      price:     { type: Number, required: true }
    }
  ],
  orderDate:   { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  status:      { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Orders', orderSchema);
