const catchAsync = require("../utils/catchAsync");
const earlyAccessService = require("../services/earlyAccess.service");
const httpStatus = require("http-status");
const logger = require("../config/logger");

/**
 * Create a new early access registration
 */
const createEarlyAccessRegistration = catchAsync(async (req, res) => {
  try {
    const registration = await earlyAccessService.createEarlyAccessRegistration(req.body);
    logger.info(`New early access registration created for: ${req.body.email}`);
    
    res.status(httpStatus.CREATED).send({
      status: "success",
      message: "Registration successful! We'll be in touch soon.",
      data: registration
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).send({
        status: "error",
        message: error.message
      });
    }
    throw error;
  }
});

/**
 * Get all early access registrations
 */
const getAllEarlyAccessRegistrations = catchAsync(async (req, res) => {
  const registrations = await earlyAccessService.getAllEarlyAccessRegistrations();
  res.status(httpStatus.OK).send({
    status: "success",
    count: registrations.length,
    data: registrations
  });
});

/**
 * Get early access registration by ID
 */
const getEarlyAccessRegistrationById = catchAsync(async (req, res) => {
  const registration = await earlyAccessService.getEarlyAccessRegistrationById(req.params.id);
  res.status(httpStatus.OK).send({
    status: "success",
    data: registration
  });
});

/**
 * Update early access registration status
 */
const updateEarlyAccessRegistration = catchAsync(async (req, res) => {
  const registration = await earlyAccessService.updateEarlyAccessRegistration(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send({
    status: "success",
    message: "Registration updated successfully",
    data: registration
  });
});

module.exports = {
  createEarlyAccessRegistration,
  getAllEarlyAccessRegistrations,
  getEarlyAccessRegistrationById,
  updateEarlyAccessRegistration
}; 