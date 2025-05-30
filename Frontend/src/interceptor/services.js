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

// New service for deleting user account
export const deleteUserAccount = async () => {
  try {
    // The endpoint is 'users/account/delete/' and method is DELETE
    // No request body is typically needed for a DELETE operation if using JWT for auth
    const res = await interceptors.delete("users/account/delete/");
    
    // Backend should return 204 No Content on successful deletion
    // Or it might return a JSON response like { success: true, message: "..." }
    // We'll assume success if no error is thrown and status is 204, or if res.data.success is true
    if (res.status === 204 || (res.data && res.data.success)) {
      return {
        success: true,
        message: res.data?.message || "Account deleted successfully.", // Use backend message if available
      };
    } else {
      // Handle cases where the status is not 204 but not an error either (e.g. unexpected JSON response)
      throw new Error(res.data?.message || 'Failed to delete account due to unexpected response.');
    }

  } catch (error) {
    console.error("Delete User Account error:", error.response?.data || error);
    // Clear local storage on auth failure (e.g. token expired before delete)
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("tokens");
      localStorage.removeItem("user");
      // Optionally redirect or prompt for re-login here, 
      // but the calling component will likely handle navigation after deletion failure/success.
    }
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to delete account. Please try again.",
      error: error.response?.data || error,
    };
  }
};

// ===================== SOCIAL MEDIA SERVICES =====================

// ======== POST SERVICES ========
export const getPosts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const res = await interceptors.get(`social_media/posts/?${queryParams}`);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Get Posts error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch posts.",
      error: error.response?.data || error,
    };
  }
};

export const createPost = async (postData) => {
  try {
    const formData = new FormData();
    
    // Add basic post data
    formData.append('type', postData.type || 'general');
    formData.append('content', postData.content);
    
    // Add hashtags
    if (postData.hashtags && postData.hashtags.length > 0) {
      postData.hashtags.forEach(tag => {
        formData.append('hashtags', tag);
      });
    }
    
    // Add metrics data
    if (postData.metrics) {
      formData.append('metrics_data', JSON.stringify(postData.metrics));
    }
    
    // Add media files
    if (postData.mediaFiles && postData.mediaFiles.length > 0) {
      postData.mediaFiles.forEach(file => {
        formData.append('media_files', file);
      });
    }
    
    const res = await interceptors.post("social_media/posts/create/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      success: true,
      data: res.data,
      message: "Post created successfully!",
    };
  } catch (error) {
    console.error("Create Post error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create post.",
      error: error.response?.data || error,
    };
  }
};

export const toggleReaction = async (postId, reactionType) => {
  try {
    const res = await interceptors.post(`social_media/posts/${postId}/reaction/`, {
      reaction_type: reactionType
    });
    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    console.error("Toggle Reaction error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update reaction.",
      error: error.response?.data || error,
    };
  }
};

export const toggleBookmark = async (postId) => {
  try {
    const res = await interceptors.post(`social_media/posts/${postId}/bookmark/`);
    return {
      success: true,
      message: res.data.message,
      bookmarked: res.data.bookmarked,
    };
  } catch (error) {
    console.error("Toggle Bookmark error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update bookmark.",
      error: error.response?.data || error,
    };
  }
};

export const sharePost = async (postId) => {
  try {
    const res = await interceptors.post(`social_media/posts/${postId}/share/`);
    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    console.error("Share Post error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to share post.",
      error: error.response?.data || error,
    };
  }
};

// ======== COMMENT SERVICES ========
export const getPostComments = async (postId, page = 1) => {
  try {
    const res = await interceptors.get(`social_media/posts/${postId}/comments/?page=${page}`);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Get Comments error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch comments.",
      error: error.response?.data || error,
    };
  }
};

export const createComment = async (postId, content, parentId = null) => {
  try {
    const data = { content };
    if (parentId) {
      data.parent_id = parentId;
    }
    
    const res = await interceptors.post(`social_media/posts/${postId}/comments/create/`, data);
    return {
      success: true,
      data: res.data,
      message: "Comment added successfully!",
    };
  } catch (error) {
    console.error("Create Comment error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add comment.",
      error: error.response?.data || error,
    };
  }
};

// ======== FOLLOW SERVICES ========
export const toggleFollow = async (userId) => {
  try {
    const res = await interceptors.post(`social_media/users/${userId}/follow/`);
    return {
      success: true,
      message: res.data.message,
      following: res.data.following,
    };
  } catch (error) {
    console.error("Toggle Follow error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update follow status.",
      error: error.response?.data || error,
    };
  }
};

export const getSuggestedUsers = async () => {
  try {
    const res = await interceptors.get("social_media/users/suggested/");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Get Suggested Users error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch suggested users.",
      error: error.response?.data || error,
    };
  }
};

// ======== COMMUNITY SERVICES ========
export const getCommunityStats = async () => {
  try {
    const res = await interceptors.get("social_media/community/stats/");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Get Community Stats error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch community stats.",
      error: error.response?.data || error,
    };
  }
};

export const getTrendingTopics = async () => {
  try {
    const res = await interceptors.get("social_media/community/trending/");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Get Trending Topics error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch trending topics.",
      error: error.response?.data || error,
    };
  }
};

// ======== DISCOVER SERVICES ========
export const discoverPosts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const res = await interceptors.get(`social_media/discover/?${queryParams}`);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Discover Posts error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to discover posts.",
      error: error.response?.data || error,
    };
  }
};

// ======== NOTIFICATION SERVICES ========
export const getNotifications = async (markReadIds = []) => {
  try {
    let url = "social_media/notifications/";
    if (markReadIds.length > 0) {
      url += `?mark_read=${markReadIds.join(',')}`;
    }
    
    const res = await interceptors.get(url);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Get Notifications error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch notifications.",
      error: error.response?.data || error,
    };
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const res = await interceptors.get("social_media/notifications/unread-count/");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Get Unread Count error:", error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch unread count.",
      error: error.response?.data || error,
    };
  }
};

// ======== REAL-TIME UPDATES ========
export const setupRealTimeUpdates = (onUpdate) => {
  // Polling for real-time updates (can be replaced with WebSocket later)
  const intervalId = setInterval(async () => {
    try {
      const result = await getUnreadNotificationCount();
      if (result.success) {
        onUpdate(result.data);
      }
    } catch (error) {
      console.error("Real-time update error:", error);
    }
  }, 30000); // Poll every 30 seconds
  
  return () => clearInterval(intervalId); // Return cleanup function
};
