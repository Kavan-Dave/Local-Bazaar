const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price:       { type: Number, required: true, min: 0 },
  image:       { type: String, default: '' },
  category:    { type: String, default: '' },
  stock:       { type: Number, default: 0, min: 0 }, // your code uses 'stock'
  shopId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Shops', required: true } // ref must match 'Shops'
}, { timestamps: true });

module.exports = mongoose.model('Products', productSchema);
