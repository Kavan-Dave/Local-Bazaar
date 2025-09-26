const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: String,
    contact: String,
    shopImage: String
}, { timestamps: true });

module.exports = mongoose.model('Shops', shopSchema);
