const Order = require("../models/orders.model");
const logger = require("../utils/logger");

exports.createOrder = async (req, res) => {
  try {
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

    const priceMap = {
      petrol: 125,
      octane: 150,
    };

    const pricePerLitre = priceMap[fuelType];

    if (!pricePerLitre) {
      return res.status(400).json({
        success: false,
        message: "Invalid fuel type",
      });
    }

    if (quantity && customQuantity) {
      return res.status(400).json({
        success: false,
        message: "Provide either quantity or customQuantity, not both",
      });
    }

    if (!quantity && !customQuantity) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    const finalQty =
      customQuantity != null ? Number(customQuantity) : Number(quantity);

    if (isNaN(finalQty) || finalQty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1 litre",
      });
    }

    if (finalQty > 500) {
      return res.status(400).json({
        success: false,
        message: "Quantity too large",
      });
    }

    const productPrice = pricePerLitre * finalQty;
    const bookingFee = 300;
    const totalPayable = productPrice + bookingFee;

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
      bookingFee,
      remaining: totalPayable,
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    logger.error("Create order failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    logger.error("Get all orders failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderID: req.params.id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    logger.error("Get order by ID failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "in_transit",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await Order.findOneAndUpdate(
      { orderID: req.params.id },
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    logger.error("Update order status failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderID: req.params.id });

    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    logger.error("Delete order failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};
