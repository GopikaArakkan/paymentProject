const express = require("express");
const { createCheckoutSession, cashOnDelivery } = require("../Controllers/paymentController");

const router = express.Router();


router.post("/checkout",createCheckoutSession );
router.post("/cod", cashOnDelivery);

module.exports = router;