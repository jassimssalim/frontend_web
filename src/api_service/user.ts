import http from "./http";


//test 
export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  registeredDate: string;
  image: {
    fileName: string;
    fileData: string; // Base64-encoded image data
  };
}

// test
export const getProfileByUsername = async (username: string): Promise<UserProfile> => {
  try {
    const response = await http.get(`/profiles/${username}`);
    return response.data; // The backend response containing user profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch user profile. Please try again.");
  }
};






// Define TypeScript types for user data
export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  file: File | null; // Use 'file' instead of 'image'
}

// Define the FormUserData interface that includes confirmPassword
export interface FormUserData extends UserData {
  confirmPassword: string;
}

// API function to register a user with an image upload
export const registerUser = async (userData: FormUserData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("file", userData.file as Blob); // Ensure file is appended

  try {
    const response = await http.post(`/register`, formData);
    return response.data;
  } catch (error) {
    throw new Error("Error registering user.");
  }
};

// Define the LoginDTO interface for login data
export interface LoginDTO {
  username: string;
  password: string;
}

// API function to log in a user
export const loginUser = async (loginDTO: LoginDTO): Promise<number> => {
  try {
    const response = await http.post(`/login`, loginDTO);

    if(response.status === 200){
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("userLoggedIn", "true")
      localStorage.setItem("username", loginDTO.username)

    }
    return response.status

  } catch (error) {
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

    const response = await http.post(`/reset-password`, resetPasswordDTO);
    return response.data;  // Response message from the backend
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Password reset failed. Please try again.");
  }



  


};

