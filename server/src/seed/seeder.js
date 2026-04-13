require("dotenv").config({path: '../../.env'});
const mongoose = require("mongoose");
const Order = require("../models/orders.model");
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB for seeding...");

    await Order.deleteMany();
    logger.info("Old orders removed");

    const fuelTypes = ["petrol", "octane"];
    const deliveryTypes = ["same_day", "next_day"];
    const districts = ["Dhaka", "Chittagong", "Rajshahi", "Khulna"];

    const priceMap = {
      petrol: 125,
      octane: 150,
    };

    const createRandomOrder = (_, i) => {
      const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;

      const productPrice = priceMap[fuelType] * quantity;
      const bookingFee = 300;

      return {
        orderID: uuidv4(),
        name: `User ${i + 1}`,
        phone: `0180000000${i + 1}`,
        division: "Dhaka",
        district: districts[Math.floor(Math.random() * districts.length)],
        address: `House ${i + 1}, Road ${i + 1}`,
        fuelType,
        quantity,
        deliveryType:
          deliveryTypes[Math.floor(Math.random() * deliveryTypes.length)],
        productPrice,
        bookingFee,
        remaining: productPrice + bookingFee,
        status: "pending",
      };
    };

    const orders = Array.from({ length: 10 }, createRandomOrder);

    await Order.insertMany(orders);

    logger.info("Seeder completed successfully ✅");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    logger.error("Seeder failed:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
