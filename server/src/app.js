require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const logger = require("./utils/logger");

const app = express();

// cors
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

// security
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());

// performance
app.use(compression());

// body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// rate limit
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  }),
);

// logging
app.use(
  morgan("dev", {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);

// connect db
const connectDB = require("./config/db.config");
connectDB();

// routes
app.get("/", (req, res) => {
  res.json({ success: true, message: "API Running 🚀" });
});

// -----------------------------------------------------
const orderRoutes = require('./routes/order.routes');
app.use('/api/v1/orders', orderRoutes);

const emergencyRoutes = require('./routes/emergency.routes');
app.use('/api/v1/emergencies', emergencyRoutes);
// -----------------------------------------------------

const errorHandler = require("./middleware/errorHandler.middleware");
app.use(errorHandler);

module.exports = app;
