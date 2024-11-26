import React, { useState } from "react";
import Joi from "joi"; // Import Joi for validation
import { registerUser } from "../../api_service/user"; // Import the registerUser API function
import Success from '../../utility/Success';  // Import the Success component

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

  // State for showing success message
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
        await registerUser(formData); // Call the API with formData including the file
        setSuccessMessage("User registered successfully!"); // Set the success message
        setShowSuccess(true); // Show the success message

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

        // Set a timeout to close the success message after 3000ms (3 seconds)
        setTimeout(() => {
          handleCloseSuccess(); // Close the success message after 3 seconds
        }, 3000);
      } else {
        setErrors({ file: "Please upload a profile image." }); // Set error for missing file
      }
    } catch (error) {
      setErrors({ general: "Error registering user. Please try again." }); // Set general error message
    }
  };

  // Close the success message
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage(""); // Clear the success message when closed
  };

  return (
    <div className="bg-white px-8 py-12 rounded-3xl border-2 border-gray-200 max-w-2xl mx-auto mt-8">
      <h1 className="text-4xl font-semibold">Create Account</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Please fill in your details to create an account.</p>
      <div className="mt-6">
        {/* Name and Username on the same row */}
        <div className="flex gap-5">
          <div className="w-full">
            <label className="text-lg font-medium">Name</label>
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

        {/* Image Upload */}
        <div>
          <label className="text-lg font-medium">Profile Image</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>} {/* Error for missing file */}
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 text-lg font-medium text-white bg-violet-500 rounded-xl"
          >
            Register
          </button>
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <button
              onClick={onSignIn}
              className="font-medium text-violet-500"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <Success message={successMessage} onClose={handleCloseSuccess} />
      )}
    </div>
  );
};

export default FormRegister;
