const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const emergencySchema = new mongoose.Schema(
  {
    emergencyOrderID: {
      type: String,
      unique: true,
      default: () =>
        "ORD-" +
        Date.now().toString(36).toUpperCase() +
        "-" +
        uuidv4().split("-")[0].toUpperCase(),
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: /^01[3-9]\d{8}$/,
      index: true,
    },

    locationText: {
      type: String,
      required: true,
      trim: true,
    },

    mapLink: {
      type: String,
      default: null,
      trim: true,
    },

    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },

    fuelType: {
      type: String,
      enum: ["petrol", "octane"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    urgency: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
      default: "medium",
    },

    priority: {
      type: Number,
      default: 2,
    },

    pricePerLitre: {
      type: Number,
      required: true,
      select: false,
    },

    totalPrice: {
      type: Number,
      required: true,
      select: false,
    },

    deliveryCharge: {
      type: Number,
      default: 300,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "on_the_way", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },

    acceptedAt: Date,
    deliveredAt: Date,

    note: {
      type: String,
      default: "",
      maxlength: 300,
    },
  },
  { timestamps: true },
);

const emergencyModel = mongoose.model("Emergency", emergencySchema);
module.exports = emergencyModel;
