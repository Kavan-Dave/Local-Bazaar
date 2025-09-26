const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }
});
module.exports = mongoose.model('Products', productSchema);
