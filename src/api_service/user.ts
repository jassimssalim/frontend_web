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

// //update user
// export interface UpdatedUserData {
//   name: string;
//   email: string;
//   graduateSchool?: string;
//   age?: number;
//   sex?: string;
//   links?: string;
//   address?: string;
//   bio?: string;

// }

// // Create the API call for updating the profile
// export const updateProfile = async (
//   username: string,
//   updatedUserData: UpdatedUserData
// ): Promise<any> => {
//   const formData = new FormData();
  
//   formData.append("name", updatedUserData.name);
//   formData.append("email", updatedUserData.email);
  
//   if (updatedUserData.graduateSchool) formData.append("graduateSchool", updatedUserData.graduateSchool);
//   if (updatedUserData.age) formData.append("age", updatedUserData.age.toString());
//   if (updatedUserData.sex) formData.append("sex", updatedUserData.sex);
//   if (updatedUserData.links) formData.append("links", updatedUserData.links);
//   if (updatedUserData.address) formData.append("address", updatedUserData.address);
//   if (updatedUserData.bio) formData.append("bio", updatedUserData.bio);
  

//   try {
//     const response = await http.put(`/update/${username}`, formData, {
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     throw new Error("Failed to update user profile. Please try again.");
//   }
// };


//update profile
export interface UpdateUserProfile {
  name?: string;
  email?: string;
  graduateSchool?: string;
  age?: number;
  sex?: string;
  links?: string;
  address?: string;
  bio?: string;
}

export const updateProfileByUsername = async (
  username: string,
  updatedUser: UpdateUserProfile
): Promise<{ message: string }> => {
  try {
    const response = await http.put(`/update/${username}`, updatedUser);
    return response.data; // Backend response, expected to contain a success message
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile. Please try again.");
  }
};

