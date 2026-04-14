const Emergency = require("../models/emergency.model");
const asyncHandler = require("../utils/asyncHandler");
const { resolveMapUrl } = require("../utils/urlResolver");

const PRICE_MAP = {
  petrol: 125,
  octane: 150,
};

const URGENCY_MAP = {
  low: 1,
  medium: 2,
  high: 3,
};

const DELIVERY_CHARGE = 300;

// @desc    Create emergency order
// @route   POST /api/v1/emergencies
exports.createEmergencyOrder = asyncHandler(async (req, res, next) => {
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

  const pricePerLiter = PRICE_MAP[fuelType];
  const totalPrice = pricePerLiter * quantity + DELIVERY_CHARGE;
  const priority = URGENCY_MAP[urgency] || 2;

  // Resolve shortened URL if present
  const resolvedMapLink = await resolveMapUrl(mapLink);

  const emergencyOrder = new Emergency({
    name: name?.trim(),
    phone: phone?.trim(),
    locationText: locationText?.trim(),
    mapLink: resolvedMapLink ? resolvedMapLink.trim() : null,
    fuelType,
    quantity: quantity || 1,
    urgency,
    priority,
    pricePerLitre: pricePerLiter,
    totalPrice,
    deliveryCharge: DELIVERY_CHARGE,
    note: note?.trim() || "",
  });

  await emergencyOrder.save();

  res.status(201).json({
    success: true,
    message: "Emergency order created successfully",
    data: emergencyOrder,
  });
});

// @desc    Get all emergency orders
// @route   GET /api/v1/emergencies
exports.getAllEmergencies = asyncHandler(async (req, res, next) => {
  const emergencies = await Emergency.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Emergency orders fetched successfully",
    data: emergencies,
  });
});

// @desc    Get emergency order by ID
// @route   GET /api/v1/emergencies/:id
exports.getEmergenciesById = asyncHandler(async (req, res, next) => {
  const order = await Emergency.findOne({ emergencyOrderID: req.params.id });

  if (!order) {
    const error = new Error("Emergency order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Emergency order fetched successfully",
    data: order,
  });
});

// @desc    Update emergency status
// @route   PATCH /api/v1/emergencies/:id
exports.updateEmergencyStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const allowedStatus = ["pending", "accepted", "on_the_way", "delivered", "cancelled"];

  if (!allowedStatus.includes(status)) {
    const error = new Error("Invalid status value");
    error.statusCode = 400;
    return next(error);
  }

  const updateData = { status };
  if (status === "accepted") updateData.acceptedAt = new Date();
  if (status === "delivered") updateData.deliveredAt = new Date();

  const order = await Emergency.findOneAndUpdate(
    { emergencyOrderID: req.params.id },
    { $set: updateData },
    { new: true },
  );

  if (!order) {
    const error = new Error("Emergency order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Emergency order status updated successfully",
    data: order,
  });
});

// @desc    Delete all emergency orders (DANGEROUS)
// @route   DELETE /api/v1/emergencies
exports.deleteEmergencies = asyncHandler(async (req, res, next) => {
  const result = await Emergency.deleteMany({});

  res.status(200).json({
    success: true,
    message: "All emergency orders deleted successfully",
    data: result,
  });
});

// @desc    Delete emergency order by ID
// @route   DELETE /api/v1/emergencies/:id
exports.deleteEmergenciesById = asyncHandler(async (req, res, next) => {
  const order = await Emergency.findOneAndDelete({ emergencyOrderID: req.params.id });

  if (!order) {
    const error = new Error("Emergency order not found");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Emergency order deleted successfully",
  });
});
