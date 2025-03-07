const express = require("express");
const router = express.Router();
const earlyAccessController = require("../../controller/earlyAccess.controller");

// Create a new early access registration or get all registrations
router.route("/")
  .post(earlyAccessController.createEarlyAccessRegistration)
  .get(earlyAccessController.getAllEarlyAccessRegistrations);

// Get or update a specific registration by ID
router.route("/:id")
  .get(earlyAccessController.getEarlyAccessRegistrationById)
  .patch(earlyAccessController.updateEarlyAccessRegistration);

module.exports = router; 