import axios from "axios";

// Backend base URL
const BASE_URL = "http://localhost:8080"; 

// Define TypeScript types for user data
export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
}

// Define the FormUserData interface that includes confirmPassword
export interface FormUserData extends UserData {
  confirmPassword: string;
}

// API function to register a user
export const registerUser = async (userData: UserData): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, userData);
    console.log("User registered successfully:", response.data);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Define the LoginDTO interface for login data
export interface LoginDTO {
  email: string;
  password: string;
}

// API function to log in a user
export const loginUser = async (loginDTO: LoginDTO): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginDTO);
    return response.data;  // The message from the backend ("Login successful" or "Invalid password")
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed. Please try again.");
  }
};

// Define the ResetPasswordDTO interface for password reset data
export interface ResetPasswordDTO {
  email: string;
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// API function to reset password
export const resetPassword = async (resetPasswordDTO: ResetPasswordDTO): Promise<string> => {
  try {
    // Ensure passwords match before sending the request
    if (resetPasswordDTO.newPassword !== resetPasswordDTO.confirmPassword) {
      throw new Error("New password and confirm password do not match.");
    }

    const response = await axios.post(`${BASE_URL}/reset-password`, resetPasswordDTO);
    return response.data;  // Response message from the backend
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Password reset failed. Please try again.");
  }
};
