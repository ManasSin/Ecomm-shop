import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDb(); // connect to database

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // Enable CORS

// Middleware to handle invalid routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/products", productRoutes);

// Create a new product
app.post("/api/products", (req, res) => {
  const product = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(product);
  res.json(product);
});

// Update an existing product
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === parseInt(req.params.id));
  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }
  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === parseInt(req.params.id));
  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.json(product);
});

// listen for requests
app.listen(port, () => console.log(`Listening on port ${port}...`));
