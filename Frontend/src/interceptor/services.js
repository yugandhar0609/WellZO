import interceptors from "./axios";

// User authentication services
export const loginWithGoogle = async (credentialResponse) => {
  try {
    // Send the credential object received from Google to your backend
    // The backend should verify the token and return user info/JWT token
    const res = await interceptors.post("v1/auth/google/login/", credentialResponse);
    return res.data; // Should contain user info and your backend's JWT token
  } catch (error) {
    console.error("Google login error in service:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const loginWithEmailPassword = async (email, password) => {
  try {
    // Send email and password to your backend login endpoint
    const res = await interceptors.post("v1/auth/login/", { email, password });
    return res.data; // Should contain user info and your backend's JWT token
  } catch (error) {
    console.error("Email/Password login error in service:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

// Step 1: Initiate Registration & Send OTP
export const initiateRegistration = async (registrationData) => {
  // Expects an object like { name, email, password }
  try {
    // Send name, email, password to your backend registration endpoint
    // Backend should generate OTP, store it (hashed), and send email
    const res = await interceptors.post("v1/auth/register/initiate/", registrationData);
    // Backend should return success if OTP email was sent successfully
    return res.data; 
  } catch (error) {
    console.error("Registration initiation error in service:", error.response?.data || error);
    throw error.response?.data || { message: "Registration failed due to an unexpected error." }; 
  }
};

// Step 2: Verify OTP
export const verifyOtp = async (email, otp) => {
   try {
    // Send email and OTP to your backend verification endpoint
    const res = await interceptors.post("v1/auth/register/verify/", { email, otp });
    // Backend should verify OTP, mark user as active, and maybe return JWT
    return res.data; 
  } catch (error) {
    console.error("OTP verification error in service:", error.response?.data || error);
    throw error.response?.data || { message: "OTP verification failed." }; 
  }
};
