require("dotenv").config();
const express = require("express");
//const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./Routes/productRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const adminRouter = require("./Routes/adminRoutes");
const cartRouter = require("./Routes/cartRoutes");
const RunServer = require("./DataBase/connection");


const app = express();


// app.use(cors());

app.use(cors({
  origin: true,
  credentials: true
}));



app.use(express.json());

//staticn folder for image access
app.use("/uploads", express.static("uploads"));

//Routes+
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

RunServer()


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
