import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderControler.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorder").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrdersById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivered").get(protect, admin, updateOrderToDelivered);

export default router;
