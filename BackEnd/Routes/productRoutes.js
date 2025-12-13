const express = require("express");
const router = express.Router();


const upload = require("../Middleware/upload");
const { addProduct, getAllProducts, deleteProduct } = require("../Controllers/productCtrl");

 // at a time singleimage
 router.post("/add", upload.single("image"), addProduct);
 router.get("/", getAllProducts);
 router.delete("/delete/:id", deleteProduct);

 module.exports = router;
