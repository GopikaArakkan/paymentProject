//models /products.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,  //stored filename

});
const Product = mongoose.model('product', ProductSchema);
module.exports= Product;