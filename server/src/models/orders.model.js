const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    division: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    fuelType: {
      type: String,
      required: true,
      enum: ["petrol", "octane"],
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    deliveryType: {
      type: String,
      required: true,
      enum: ["same_day", "next_day"],
    },

    productPrice: {
      type: Number,
      required: true,
    },

    bookingFee: {
      type: Number,
      required: true,
    },

    remaining: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "in_transit", "delivered", "cancelled"],
      default: "pending",
    },

    estimatedTime: String,

    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
