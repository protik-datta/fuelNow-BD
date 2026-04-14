const express = require("express");
const router = express.Router();
const multer = require("multer");
const validate = require('../middleware/validate.middleware');
const { emergencyOrderSchema } = require('../validation/emergency.validation');

const upload = multer();

const createEmergencyOrder = require("../controllers/emergency.controller").createEmergencyOrder;
const getAllEmergencies =
  require("../controllers/emergency.controller").getAllEmergencies;
const getEmergenciesById = require("../controllers/emergency.controller").getEmergenciesById;
const updateEmergencyStatus =
  require("../controllers/emergency.controller").updateEmergencyStatus;
const deleteEmergencies =
  require("../controllers/emergency.controller").deleteEmergencies;
const deleteEmergenciesById =
  require("../controllers/emergency.controller").deleteEmergenciesById;
  // create emergency order
  router.post(
    "/",
    upload.none(),
    validate(emergencyOrderSchema),
    createEmergencyOrder,
  );
// get all emergency orders
router.get("/", getAllEmergencies);
// get emergency order by ID
router.get("/:id", getEmergenciesById);
// update emergency order status
router.patch("/:id", upload.none(), updateEmergencyStatus);
// delete all emergency orders (DISABLED FOR SECURITY)
// router.delete("/", deleteEmergencies);
// delete emergency order by ID
router.delete("/:id", deleteEmergenciesById);

module.exports = router;
