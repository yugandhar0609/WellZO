import interceptors from "./axios";

// Helper function to safely store data
const safeStore = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to store ${key}:`, e);
  }
};

// User authentication services
export const loginWithGoogle = async (credentialResponse) => {
  try {
    const res = await interceptors.post("users/google-login/", {
      token: credentialResponse.credential
    });
    
    if (!res.data.success) {
      throw new Error(res.data.message || 'Google authentication failed');
    }
    
    handleAuthResponse(res.data);
    
    return {
      success: true,
      message: res.data.message,
      user: res.data.user,
      tokens: res.data.tokens,
      isProfileComplete: res.data.isProfileComplete
    };
  } catch (error) {
    handleAuthError(error);
    throw {
      success: false,
      message: error.response?.data?.message || error.message || 'Google authentication failed',
      error: error.response?.data || error
    };
  }
};

export const loginWithEmailPassword = async (email, password) => {
  try {
    const res = await interceptors.post("users/login/", { email, password });
    handleAuthResponse(res.data);
    return {
      ...res.data,
      isProfileComplete: res.data.isProfileComplete || false
    };
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Step 1: Registration
export const initiateRegistration = async (registrationData) => {
  try {
    const res = await interceptors.post("users/register/", registrationData);
    // Store email temporarily for OTP verification
    if (res.data.email) {
      localStorage.setItem("pendingVerificationEmail", res.data.email);
    }
    return {
      success: true,
      message: res.data.message,
      email: res.data.email
    };
  } catch (error) {
    console.error("Registration error:", error.response?.data || error);
    throw {
      success: false,
      message: error.response?.data?.message || "Registration failed",
      error: error.response?.data || error
    };
  }
};

// Step 2: Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const res = await interceptors.post("users/verify-otp/", { 
      email: email || localStorage.getItem("pendingVerificationEmail"), 
      otp 
    });
    
    // Clear pending verification email
    localStorage.removeItem("pendingVerificationEmail");
    
    // Store tokens and user data if verification successful
    if (res.data.tokens) {
      handleAuthResponse(res.data);
    }
    
    return {
      success: true,
      message: res.data.message,
      user: res.data.user,
      tokens: res.data.tokens
    };
  } catch (error) {
    console.error("OTP verification error:", error.response?.data || error);
    throw {
      success: false,
      message: error.response?.data?.message || "OTP verification failed",
      error: error.response?.data || error
    };
  }
};

// Helper functions
const handleAuthResponse = (data) => {
  if (data.tokens) {
    safeStore("tokens", data.tokens);
  }
  if (data.user) {
    safeStore("user", data.user);
  }
};

const handleAuthError = (error) => {
  console.error("Auth Error:", error.response?.data || error);
  if (error.response?.status === 401) {
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
  }
};

export const requestPasswordResetOtp = async (email) => {
  try {
    const res = await interceptors.post("users/password-reset-request/", { email });
    return {
      success: res.data.success !== undefined ? res.data.success : true, // Assume success if not specified, for generic msgs
      message: res.data.message,
    };
  } catch (error) {
    console.error("Request Password Reset OTP error:", error.response?.data || error);
    return { // Return a structured error object
      success: false,
      message: error.response?.data?.message || "Failed to request password reset. Please try again.",
      error: error.response?.data || error,
    };
  }
};

export const confirmPasswordReset = async (email, otp, new_password) => {
  try {
    const res = await interceptors.post("users/password-reset-confirm/", {
      email,
      otp,
      new_password,
    });
    return {
      success: res.data.success,
      message: res.data.message,
    };
  } catch (error) {
    console.error("Confirm Password Reset error:", error.response?.data || error);
    return { // Return a structured error object
      success: false,
      message: error.response?.data?.message || "Failed to reset password. Please try again.",
      errors: error.response?.data?.errors, // Include detailed errors if available
      error: error.response?.data || error,
    };
  }
};

export const getUserProfile = async () => {
  try {
    const res = await interceptors.get("users/profile/");
    // The backend UserProfileView returns the profile data directly on success
    return {
      success: true,
      data: res.data, // res.data should be the profile object
    };
  } catch (error) {
    console.error("Get User Profile error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.detail || error.message || "Failed to fetch user profile.",
      error: error.response?.data || error,
    };
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const res = await interceptors.put("users/profile/", profileData);
    // The backend UserProfileView returns the updated profile data on success
    return {
      success: true,
      message: "Profile updated successfully.", // Or use a message from backend if available
      data: res.data,
    };
  } catch (error) {
    console.error("Update User Profile error:", error.response?.data || error);
    // Backend might return specific field errors in error.response.data
    // For a generic message:
    let detailedError = "Failed to update user profile.";
    if (typeof error.response?.data === 'object' && error.response.data !== null) {
        const errorMessages = Object.entries(error.response.data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('; ');
        if (errorMessages) detailedError = errorMessages;
    } else if (error.response?.data?.detail) {
        detailedError = error.response.data.detail;
    } else if (error.message) {
        detailedError = error.message;
    }
    
    return {
      success: false,
      message: detailedError,
      errors: error.response?.data, // Keep the original errors object
      error: error.response?.data || error,
    };
  }
};
