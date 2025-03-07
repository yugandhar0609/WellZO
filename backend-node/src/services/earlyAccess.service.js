const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const supabase = require("../config/supabaseClient");
const logger = require("../config/logger");
const { v4: uuidv4 } = require('uuid');
const { validateEarlyAccess } = require("../models/earlyAccess.model");

/**
 * Create a new early access registration in Supabase
 * @param {Object} reqBody - Request body containing registration data
 * @returns {Promise<Object>} Created registration
 */
const createEarlyAccessRegistration = async (reqBody) => {
  const { firstName, lastName, email, phoneNumber, location, healthGoal, betaTester } = reqBody;
  
  // Validate data
  const validation = validateEarlyAccess(reqBody);
  if (!validation.valid) {
    throw new ApiError(httpStatus.BAD_REQUEST, validation.message);
  }
  
  // Check if email already exists
  const { data: existingUser, error: searchError } = await supabase
    .from('early_access_registrations')
    .select('email')
    .eq('email', email.toLowerCase())
    .maybeSingle();
  
  if (searchError) {
    logger.error("Error checking for existing email:", searchError);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error processing registration");
  }
  
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already registered for early access.");
  }
  
  const newRegistration = {
    id: uuidv4(),
    first_name: firstName,
    last_name: lastName,
    email: email.toLowerCase(),
    phone_number: phoneNumber,
    location: location,
    health_goal: healthGoal,
    beta_tester: betaTester === true || betaTester === "true",
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('early_access_registrations')
    .insert([newRegistration])
    .select();
    
  if (error) {
    logger.error("Supabase insert error:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error creating registration");
  }
  
  logger.info(`Successfully registered ${email} for early access`);
  
  // Return in camelCase format for consistency in API
  return {
    id: newRegistration.id,
    firstName: newRegistration.first_name,
    lastName: newRegistration.last_name,
    email: newRegistration.email,
    phoneNumber: newRegistration.phone_number,
    location: newRegistration.location,
    healthGoal: newRegistration.health_goal,
    betaTester: newRegistration.beta_tester,
    status: newRegistration.status,
    createdAt: newRegistration.created_at,
    updatedAt: newRegistration.updated_at
  };
};

/**
 * Get all early access registrations
 * @returns {Promise<Array>} List of registrations
 */
const getAllEarlyAccessRegistrations = async () => {
  const { data, error } = await supabase
    .from('early_access_registrations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    logger.error("Error fetching registrations:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error fetching registrations");
  }
  
  // Transform to camelCase for API consistency
  return data.map(item => ({
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    email: item.email,
    phoneNumber: item.phone_number,
    location: item.location,
    healthGoal: item.health_goal,
    betaTester: item.beta_tester,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
};

/**
 * Get early access registration by ID
 * @param {string} id - Registration ID
 * @returns {Promise<Object>} Registration data
 */
const getEarlyAccessRegistrationById = async (id) => {
  const { data, error } = await supabase
    .from('early_access_registrations')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    logger.error(`Error fetching registration ${id}:`, error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error fetching registration");
  }
  
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Registration not found");
  }
  
  // Transform to camelCase for API consistency
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    location: data.location,
    healthGoal: data.health_goal,
    betaTester: data.beta_tester,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

/**
 * Update registration status
 * @param {string} id - Registration ID
 * @param {Object} updateBody - Fields to update
 * @returns {Promise<Object>} Updated registration
 */
const updateEarlyAccessRegistration = async (id, updateBody) => {
  // Check if registration exists
  const registration = await getEarlyAccessRegistrationById(id);
  
  const updateData = {
    updated_at: new Date().toISOString(),
    ...(updateBody.firstName && { first_name: updateBody.firstName }),
    ...(updateBody.lastName && { last_name: updateBody.lastName }),
    ...(updateBody.phoneNumber && { phone_number: updateBody.phoneNumber }),
    ...(updateBody.location && { location: updateBody.location }),
    ...(updateBody.healthGoal && { health_goal: updateBody.healthGoal }),
    ...(updateBody.status && { status: updateBody.status }),
    ...(updateBody.betaTester !== undefined && { beta_tester: updateBody.betaTester })
  };
  
  const { error } = await supabase
    .from('early_access_registrations')
    .update(updateData)
    .eq('id', id);
    
  if (error) {
    logger.error(`Error updating registration ${id}:`, error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error updating registration");
  }
  
  logger.info(`Successfully updated registration ${id}`);
  
  // Get the updated registration
  return getEarlyAccessRegistrationById(id);
};

module.exports = {
  createEarlyAccessRegistration,
  getAllEarlyAccessRegistrations,
  getEarlyAccessRegistrationById,
  updateEarlyAccessRegistration
}; 