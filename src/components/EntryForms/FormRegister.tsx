import React, { useState } from "react";
import Joi from "joi"; // Import Joi for validation
import { registerUser } from "../../api_service/user"; // Import the registerUser API function
import { toast, ToastContainer } from "react-toastify";  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toast CSS

interface FormRegisterProps {
  onSignIn: () => void; // Function to switch to login form
}

// Define the TypeScript type for user data
export interface FormUserData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  file: File | null; // Changed 'image' to 'file' to match the API
}

const FormRegister: React.FC<FormRegisterProps> = ({ onSignIn }) => {
  // State to hold form input values
  const [formData, setFormData] = useState<FormUserData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: null, // Changed 'image' to 'file'
  });

  // State for validation errors
  const [errors, setErrors] = useState<any>({});

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, file: file }); // Changed 'image' to 'file'
  };

  // Joi validation schema
  const validationSchema = Joi.object({
    name: Joi.string().min(3).required().label("Name"),
    username: Joi.string().min(3).required().label("Username"),
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password")
      .messages({
        "any.only": "Passwords must match",
      }),
    file: Joi.any().required().label("Profile Image").messages({
      "any.required": "Please upload a profile image", // Ensures the file is required
    }), // Changed 'image' to 'file'
  });

  // Handle form submission
  const handleSubmit = async () => {
    const { error } = validationSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });

      // Check if the file is missing and manually set an error for file
      if (!formData.file) {
        newErrors.file = "Please upload a profile image";  // Add this error message
      }

      setErrors(newErrors); // Update the errors state
      return; // Return to stop form submission if there are errors
    }

    try {
      if (formData.file) {
        const response = await registerUser(formData); // Call the API with formData including the file

        // Log the response for debugging
        console.log('Response from API:', response);

        // Check for username or email errors in the response
        const usernameError = response.usernameError;
        const emailError = response.emailError;
        const bothError = response.bothError;

        if (bothError) {
          toast.error("Username and Email already taken!"); // Show toast if both username and email are taken
          throw new Error("Both username and email already taken."); // Throw error to prevent further processing
        } else if (usernameError) {
          toast.error("Username already taken!"); // Show toast if username exists
          throw new Error("Username already taken."); // Throw error to prevent further processing
        } else if (emailError) {
          toast.error("Email already taken!"); // Show toast if email exists
          throw new Error("Email already taken."); // Throw error to prevent further processing
        }

        // Show success toast notification
        toast.success("User registered successfully!");

        // Clear form data
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          file: null,
        });

        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }

        setErrors({});
      } else {
        setErrors({ file: "Please upload a profile image." }); // Set error for missing file
      }
    } catch (error: any) {
      // Log the error to ensure we're catching the right error
      console.error('Error during registration:', error.message);

      setErrors({ general: "Error registering user. Please try again." }); // Set general error message

      // Show toast for general errors
      toast.error(error.message || "Error registering user. Please try again.");
    }
  };

  return (
    <div className="bg-white px-8 py-12 rounded-3xl border-2 border-gray-200 max-w-2xl mx-auto mt-8">
      <h1 className="text-4xl font-semibold ">Create Account</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Please fill in your details to create an account.</p>
      <div className="mt-6">
        {/* Name and Username on the same row */}
        <div className="flex gap-5">
          <div className="w-full">
            <label className="text-lg font-medium">Full Name</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="w-full">
            <label className="text-lg font-medium">Username</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
        </div>

        {/* Email input field */}
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password and Confirm Password on the same row */}
        <div className="flex gap-5 mt-4">
          <div className="w-full">
            <label className="text-lg font-medium">Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="w-full">
            <label className="text-lg font-medium">Confirm Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
              placeholder="Confirm your password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Profile Image */}
        <div className="mt-6">
          <label className="text-lg font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2"
          />
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            className="w-full bg-violet-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-500">Already have an account? <span className="font-semibold cursor-pointer text-violet-500 " onClick={onSignIn}>Sign In</span></p>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default FormRegister;
