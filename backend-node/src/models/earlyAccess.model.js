// Define schema structure for early access registrations
// This is just for reference, actual data stored in Supabase

const earlyAccessSchema = {
  id: 'string', // UUID
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  phoneNumber: 'string',
  location: 'string',
  healthGoal: 'string', // One of: weight-loss, muscle-gain, healthy-eating, meal-planning, other
  betaTester: 'boolean',
  status: 'string', // One of: pending, approved, rejected
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Validation function
const validateEarlyAccess = (data) => {
  const { firstName, lastName, email, phoneNumber, location, healthGoal } = data;
  
  if (!firstName || !lastName || !email || !phoneNumber || !location || !healthGoal) {
    return { valid: false, message: 'All fields are required' };
  }
  
  // Basic email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  
  const validHealthGoals = ['weight-loss', 'muscle-gain', 'healthy-eating', 'meal-planning', 'other'];
  if (!validHealthGoals.includes(healthGoal)) {
    return { valid: false, message: 'Invalid health goal selected' };
  }
  
  return { valid: true };
};

module.exports = {
  validateEarlyAccess
}; 