import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../modals/orderModal.js";

// @desc    create New order
// @route   POST /api/order
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((orders) => ({
        ...orders,
        product: orders._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    get logged-in user order
// @route   GET /api/order/myorders
// @access  private
const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Unauthorized Users");
  }
});

// @desc    Get orders by ID
// @route   GET /api/order/:id
// @access  private
const getOrdersById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Unauthorized Users");
  }
});

// @desc    Update orders to paid
// @route   put /api/order/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order && !order.isPaid) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    res.status(201).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order details not found");
  }
});

// @desc    Update orders to delivered
// @route   GET /api/order/:id/deliver
// @access  private / admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update orders to Delivered");
});

// @desc    Get all orders
// @route   GET /api/order
// @access  private / admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders admin");
});

export {
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
