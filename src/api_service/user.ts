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
  } catch (error) {
    throw new Error("Error registering user.");
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
//end login user

// reset password start
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

//reset end