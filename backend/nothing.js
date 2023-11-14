const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Dummy data
let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

// Routes
app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.send(product);
});

app.post("/api/products", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(product);
  res.send(product);
});

app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  product.name = req.body.name;
  product.price = req.body.price;
  res.send(product);
});

app.delete("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
