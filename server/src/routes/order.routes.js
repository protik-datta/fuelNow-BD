const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const createOrder =
  require("../controllers/order.controller").createOrder;
const getAllOrders =
  require("../controllers/order.controller").getAllOrders;
const getOrderById =
  require("../controllers/order.controller").getOrderById;
const updateOrderStatus =
  require("../controllers/order.controller").updateOrderStatus;
const deleteOrders = require("../controllers/order.controller").deleteOrders;
const deleteOrder = require("../controllers/order.controller").deleteOrder;

const validate = require("../middleware/validate.middleware");
const orderValidationSchema = require("../validation/order.validation");

// create order
router.post("/", upload.none(), validate(orderValidationSchema), createOrder);
// get all orders
router.get("/", getAllOrders);
// get order by ID
router.get("/:id", getOrderById);
// update order status
router.patch("/:id", upload.none(), updateOrderStatus);
// delete all orders
router.delete("/", deleteOrders);
// delete order
router.delete("/:id", deleteOrder);

module.exports = router;
