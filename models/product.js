
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:  { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true},
    image: String,
    name: String,
    price: Number,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
 
const Product = mongoose.model('Product', productSchema);  
module.exports = Product;
