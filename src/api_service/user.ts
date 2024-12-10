import { StringLiteral } from "typescript";
import http from "./http";




//get user profile  by username
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
  graduateSchool?: string; 
  age?: number;             
  sex?: string;             
  links?: string;           
  address?: string;         
  bio?: string;    
  phone?:string;   
  error?:string     
}

export const getProfileByUsername = async (username: string): Promise<UserProfile> => {
  try {
    const response = await http.get(`/profiles/${username}`);
    return response.data; // The backend response containing user profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch user profile. Please try again.");
  }
};
// end





// register user
export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  file: File | null; 
}

export interface FormUserData extends UserData {
  confirmPassword: string;
}

export const registerUser = async (userData: FormUserData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("file", userData.file as Blob);

  try {
    const response = await http.post(`/register`, formData);
    return response.data;
  } catch (error: any) {
    // Handle specific error messages for email or username
    if (error.response && error.response.status === 409) {
      const errorData = error.response.data;
      const emailError = errorData.emailError;
      const usernameError = errorData.usernameError;
      const bothError = errorData.bothError;


      // Return a more detailed error message
      if (bothError) {
        throw new Error(bothError);
      } else if (usernameError) {
        throw new Error(usernameError);

      } else if(emailError){
        throw new Error (emailError);
      } else {
        throw new Error("Error registering user.");
      }
    } else {
      throw new Error("Error registering user.");
    }
  }
};


//end register user

// logi n user
export interface LoginDTO {
  username: string;
  password: string;
}
export const loginUser = async (loginDTO: LoginDTO): Promise<number> => {
  try {
    const response = await http.post(`/login`, loginDTO);

    // If login is successful
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("username", loginDTO.username);
      localStorage.setItem("userId", response.data.userId);

      return response.status; // Ensure this code path returns a number
    }

    // Handle unexpected successful status codes
    return response.status || 500; // Return 500 as a fallback
  } catch (error: any) {
    // Extract error message from the response if available
    const backendErrorMessage = error.response?.data?.error;

    if (error.response?.status === 403) {
      throw new Error(backendErrorMessage || "Your account is inactive. Reset your password to become active again.");
    }

    if (error.response?.status === 404) {
      throw new Error(backendErrorMessage || "User not found.");
    }

    if (error.response?.status === 401) {
      throw new Error(backendErrorMessage || "Invalid username or password.");
    }

    // Generic error message for other cases
    throw new Error(backendErrorMessage || "Login failed. Please try again.");
  }
};



// reset password start V1
export interface ResetPasswordDTO {
  email: string;
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const resetPassword = async (resetPasswordDTO: ResetPasswordDTO): Promise<string> => {
  try {
    if (resetPasswordDTO.newPassword !== resetPasswordDTO.confirmPassword) {
      throw new Error("New password and confirm password do not match.");
    }

    const response = await http.post(`/reset-password`, resetPasswordDTO);
    return response.data;  
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Password reset failed. Please try again.");
  }
};

//reset end v1
//reset start v2 
export interface ResetPasswordDTOv2 {
  username: string;
  newPassword: string;
  confirmPassword: string;
}

export const updatePassword = async (resetPasswordDTOv2: ResetPasswordDTOv2): Promise<string> => {
  try {
    if (resetPasswordDTOv2.newPassword !== resetPasswordDTOv2.confirmPassword) {
      throw new Error("New password and confirm password do not match.");
    }

    const response = await http.post(`/update-password`, resetPasswordDTOv2);
    return response.data; // Return the success message from the server
  } catch (error: any) {
    console.error("Error updating password:", error);
    throw new Error(error.response?.data || "Password update failed. Please try again.");
  }
};



//update profile
export interface UpdateUserProfile {
  name?: string;
  username?:string;
  email?: string;
  graduateSchool?: string;
  age?: number;
  sex?: string;
  links?: string;
  address?: string;
  bio?: string;
  phone?:string;
}
export const updateProfileByUsername = async (
  username: string,
  updatedUser: UpdateUserProfile
): Promise<{ message: string }> => {
  try {
    const response = await http.put(`/update/${username}`, updatedUser);
    return response.data; // Backend response, expected to contain a success message
  } catch (error: any) {
    console.error("Error updating profile:", error);

    if (error.response && error.response.status === 409) {
      const errorData = error.response.data;
      const emailError = errorData.emailError;

      // Handle specific email error
      if (emailError) {
        throw new Error(emailError);
      } else {
        throw new Error("Error updating profile. Please try again.");
      }
    } else {
      throw new Error("Failed to update profile. Please try again.");
    }
  }
};




// Delete user by username
export const deleteUser = async (username: string): Promise<{ message: string }> => {
  try {
    const response = await http.delete(`/delete/${username}`);
    return response.data; // Backend response containing the success message
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again.");
  }
};

export function getUserByUserId(userId: number) {
  return http.get(`/profiles/userId/${userId}`)
};


// deactivate user by username
export const userDeactivate = async (username: string): Promise<{ message: string }> => {
  try {
    const response = await http.put(`/deactivate/${username}`);
    return response.data; // Backend response containing the success message
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again.");
  }
};





// A lightweight version for when only name and image are needed
export interface UserNameAndImage {
  name: string;
  image: {
    fileName: string;
    fileData: string; // Base64-encoded image data
  };
}

// Adjust the function to match the lightweight interface
export const getAllUsersExceptCurrent = async (): Promise<UserNameAndImage[]> => {
  const currentUsername = localStorage.getItem("username");
  
  if (!currentUsername) {
    throw new Error("No logged-in user found.");
  }

  try {
    const response = await http.get(`/users/excludeCurrent`, {
      params: { currentUsername },
    });
    return response.data; // The backend returns only name and image
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users. Please try again.");
  }
};
