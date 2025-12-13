// const cart = require("../models/Cart");
const cart = require("../Model/cart");
const product = require("../Model/product");
// const Product = require("../models/Product");

//Add to cart
exports.addToCart = async (req, res) => {
    try{
        const { productId, quantity } = req.body;

        //check if product exists
        const product = await product.findById(ProductId);
        if(!product) {
            return res.status(404).json({ message: "Product not found"});
        }


        //check if product already in cart
        const existingItem = await cart.findOne({ productId});
        if(existingItem) {
            existingItem.quantity += quantity || 1;
            await existingItem.save();
            return res.json({ message: "cart updated", cartItem:existingItem});
        }

        //create nre card item
        const cartItem = new Cart({
            productId,
            quantity: quantity || 1,
        });

        await cartItem.save();
        res.json({ message: "Added to cart", cartItem});
    }catch(error) {
        res.status(500).json({ error: error.message });
    }
};

//Get all cart items (with product details)
exports.getCartItems = async (req, res) => {
    try{
        const items = await Cart.find().populate("productId");  //gets product name, price, image
        res.json(items);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

