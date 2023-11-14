import express from "express";
import products from "./products.js";

const app = express();

// Middleware to handle invalid routes
app.use(express.json());

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get a single product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === parseInt(req.params.id));
  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }
  res.json(product);
});

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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
