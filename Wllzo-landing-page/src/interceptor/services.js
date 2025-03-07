import interceptors from "./axios";

// User authentication services


// Early Access services
export const registerEarlyAccess = async (data) => {
  try {
    const res = await interceptors.post("v1/early-access", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
