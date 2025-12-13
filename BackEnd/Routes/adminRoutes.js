const express = require("express");
const { loginAdmin } = require("../Controllers/adminCtrl");
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

module.exports = adminRouter;