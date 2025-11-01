const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  ownerId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // ref must match 'Users'
  address:   { type: String },
  contact:   { type: String },
  shopImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Shops', shopSchema);
