import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  UpdateProduct,
  DeleteProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, UpdateProduct)
  .delete(protect, admin, DeleteProduct);
router.route("/:id/review").post(protect, createProductReview);

export default router;
