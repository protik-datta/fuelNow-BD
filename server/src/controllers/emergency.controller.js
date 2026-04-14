const Emergency = require("../models/emergency.model");
const logger = require("../utils/logger");

const priceMap = {
  petrol: 125,
  octane: 150,
};

const urgencyMap = {
  low: 1,
  medium: 2,
  high: 3,
};

exports.createEmergencyOrder = async (req, res) => {
  try {
    const {
      name,
      phone,
      locationText,
      mapLink,
      fuelType,
      quantity,
      urgency,
      note,
    } = req.body;

    const pricePerLiter = priceMap[fuelType];
    const deliveryCharge = 300;
    const totalPrice = pricePerLiter * quantity + deliveryCharge;

    const priority = urgencyMap[urgency] || 2;

    const emergencyOrder = new Emergency({
      name: name.trim(),
      phone: phone.trim(),
      locationText: locationText.trim(),
      mapLink: mapLink ? mapLink.trim() : null,
      fuelType: fuelType,
      quantity : quantity || 1,
      urgency : urgency,
      priority: priority,
      pricePerLitre: pricePerLiter,
      totalPrice: totalPrice,
      deliveryCharge: deliveryCharge,
      acceptedAt: null,
      deliveredAt: null,
      note: note ? note.trim() : "",
    });

    await emergencyOrder.save();

    res.status(201).json({
      success: true,
      message: "Emergency order created successfully",
      data: emergencyOrder,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create emergency order",
    });
  }
};

exports.getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Emergency orders fetched successfully",
      data: emergencies,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency orders",
    });
  }
};

exports.getEmergenciesById = async (req, res) => {
  try {
    const order = await Emergency.findOne({ emergencyOrderID: req.params.id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Emergency order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency order fetched successfully",
      data: order,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency order",
    });
  }
};

exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "accepted",
      "on_the_way",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updateData = { status };

    if (status === "accepted") {
      updateData.acceptedAt = new Date();
    }

    if (status === "delivered") {
      updateData.deliveredAt = new Date();
    }

    const order = await Emergency.findOneAndUpdate(
      { emergencyOrderID: req.params.id },
      { $set: updateData },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Emergency order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency order status updated successfully",
      data: order,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update emergency order status",
    });
  }
};

exports.deleteEmergencies = async (req, res) => {
  try {
    const deleteOrders = await Emergency.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All emergency orders deleted successfully",
      data: deleteOrders,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete emergency orders",
    });
  }
};

exports.deleteEmergenciesById = async (req, res) => {
  try {
    const order = await Emergency.findOneAndDelete({
      emergencyOrderID: req.params.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Emergency order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency order deleted successfully",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete emergency order",
    });
  }
};
