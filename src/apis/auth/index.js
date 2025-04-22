import axios from "@/config/axiosConfig";

export const registerUser = async ({
  name,
  email,
  password,
  verificationMethod,
}) => {
  try {
    const response = await axios.post("/users/register", {
      name,
      email,
      password,
      verificationMethod,
    });

    return response.data;
  } catch (error) {
    console.log("registerUser", error);
    throw error;
  }
};

export const verifyUserwithCode = async ({ email, otp }) => {
  try {
    const response = await axios.post("/users/verify-otp", {
      email,
      otp,
    });

    return response.data;
  } catch (error) {
    console.log("verify OTP User", error);
    throw error.response.data;
  }
};

export const loginUser = async ({ email, password }) => {
  console.log("Login API called with:", email, password); // 👈 ye add kar
  try {
    const response = await axios.post("/users/login", {
      email,
      password,
    });

    console.log("Login API Response:", response); // 👈 ye add kar
    return response.data;
  } catch (error) {
    console.log("Login API Error:", error.response?.data || error);
    throw error.response.data;
  }
};

export const forgetPassword = async ({ email }) => {
  try {
    const response = await axios.post("/users/password/forget", {
  email,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log("forgetPassword", error);
    throw error;
  }
};

export const resetPassword = async ({ password, confirmPassword, token }) => {
  try {
    const response = await axios.put(`/users/password/reset/${token}`, {
      password,
      confirmPassword,
    });

    return response.data;
  } catch (error) {
    console.log("resetPassword", error);
    throw error;
  }
};

