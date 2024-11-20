import React, { useState } from 'react';
import Joi from 'joi';  // Import Joi for validation
import { resetPassword, ResetPasswordDTO } from '../../API Services/userAPIs';  // Import the resetPassword function from the API module

interface ResetPasswordProps {
  onBackToLogin: () => void; // Function to go back to the login form
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onBackToLogin }) => {
  // State for user inputs
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);  // Error message state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);  // Success message state

  // Joi validation schema with only newPassword validation
  const schema = Joi.object({
    newPassword: Joi.string().min(7).required().messages({
      "string.min": "New password must be at least 7 characters",
      "any.required": "New password is required",
    }),
  });

  // Function to handle form submission
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default behavior

    // Validate user inputs
    const { error } = schema.validate({
      newPassword,
    });

    if (error) {
      setError(error.details[0].message);  // Set error message
      return;
    }

    setError(null);  // Clear previous errors

    // Check if the new password is the same as the old password
    if (oldPassword === newPassword) {
      setError('New password cannot be the same as the old password');
      return;
    }

    const resetPasswordData: ResetPasswordDTO = {
      email,
      username,
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const response = await resetPassword(resetPasswordData); // Call API to reset password
      setSuccessMessage(response);  // Set success message
      setEmail('');
      setUsername('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');  // Clear form fields

      // Remove success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);  // Set error message if API call fails
      } else {
        setError('An unexpected error occurred.');
      }
      setSuccessMessage(null);  // Clear success message

      // Remove error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-white px-24 py-20 rounded-3xl border-2 border-gray-200 max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold">Reset Password</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Please enter your details to reset your password.</p>
      <form onSubmit={handlePasswordReset} className="mt-8">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Username and Previous Password on the same row */}
        <div className="flex gap-6 mt-4">
          <div className="w-full">
            <label className="text-lg font-medium">Username</label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-lg font-medium">Previous Password</label>
            <input
              type="password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your previous password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>

        {/* New Password and Confirm New Password on the same row */}
        <div className="flex gap-6 mt-4">
          <div className="w-full">
            <label className="text-lg font-medium">New Password</label>
            <input
              type="password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-lg font-medium">Confirm New Password</label>
            <input
              type="password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Confirm the new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        {successMessage && <div className="mt-4 text-green-500 text-sm">{successMessage}</div>}

        <div className="mt-8 flex flex-col gap-y-4">
          <button type="submit" className="py-4 bg-violet-500 text-white text-lg font-bold">
            Reset Password
          </button>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={onBackToLogin} // Trigger function to switch back to the login form
            className="ml-2 text-violet-500 text-base font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
