const Order = require("../models/orders.model");
const asyncHandler = require("../utils/asyncHandler");

const PRICE_MAP = {
  petrol: 125,
  octane: 150,
};

const BOOKING_FEE = 300;

// @desc    Create new order
// @route   POST /api/v1/orders
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    name,
    phone,
    division,
    district,
    address,
    fuelType,
    quantity,
    customQuantity,
    deliveryType,
  } = req.body;

  const pricePerLitre = PRICE_MAP[fuelType];

  if (!pricePerLitre) {
    const error = new Error("Invalid fuel type");
    error.statusCode = 400;
    return next(error);
  }

  const finalQty = customQuantity != null ? Number(customQuantity) : Number(quantity);

  if (isNaN(finalQty) || finalQty < 1) {
    const error = new Error("Quantity must be at least 1 litre");
    error.statusCode = 400;
    return next(error);
  }

  const productPrice = pricePerLitre * finalQty;
  const totalPayable = productPrice + BOOKING_FEE;

  const order = new Order({
    name: name?.trim(),
    phone: phone?.trim(),
    division: division?.trim(),
    district: district?.trim(),
    address: address?.trim(),
    fuelType,
    quantity: finalQty,
    deliveryType,
    productPrice,
    bookingFee: BOOKING_FEE,
    remaining: totalPayable,
  });

  await order.save();

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

// @desc    Get all orders
// @route   GET /api/v1/orders
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ orderID: req.params.id });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Order retrieved successfully",
    data: order,
  });
});

// @desc    Update order status
// @route   PATCH /api/v1/orders/:id
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ["pending", "confirmed", "in_transit", "delivered", "cancelled"];

  if (!validStatuses.includes(status)) {
    const error = new Error("Invalid status value");
    error.statusCode = 400;
    return next(error);
  }

  const order = await Order.findOneAndUpdate(
    { orderID: req.params.id },
    { status },
    { new: true },
  );

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
});

// @desc    Delete all orders (DANGEROUS)
// @route   DELETE /api/v1/orders
exports.deleteOrders = asyncHandler(async (req, res, next) => {
  // Check for admin/secret header in production if ever needed
  const result = await Order.deleteMany({});

  res.status(200).json({
    success: true,
    message: "Orders deleted successfully",
    data: result,
  });
});

// @desc    Delete single order
// @route   DELETE /api/v1/orders/:id
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOneAndDelete({ orderID: req.params.id });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
