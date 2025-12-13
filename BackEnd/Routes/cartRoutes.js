//routes/cartRoutes.js

const { addToCart, getCartItems } = require('../Controllers/cartController');

const cartRouter = require('express').Router();


cartRouter.post('/add', addToCart);
cartRouter.get('/', getCartItems);
module.exports = cartRouter;
