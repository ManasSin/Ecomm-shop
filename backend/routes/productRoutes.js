import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../modals/productModal.js";

const router = express.Router();

// Get all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Get a single product by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // console.log(product);
    if (product) {
      return res.json(product);
    }
    res.status(404).json({ message: "Product not found" });
  })
);

export default router;
