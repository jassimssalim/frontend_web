import React, { useState } from 'react';
import Joi from 'joi';
import { resetPassword, ResetPasswordDTO } from '../../api_service/user'; // Import your API function
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify's toast function and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

interface ResetPasswordProps {
  onBackToLogin: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Joi validation schema for the new password
  const schema = Joi.object({
    newPassword: Joi.string().min(7).required().messages({
      "string.min": "New password must be at least 7 characters",
      "any.required": "New password is required",
    }),
  });

  // Handle form submission for resetting the password
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the form is filled out
    if (!email || !username || !oldPassword || !newPassword || !confirmPassword) {
      toast.error('You must fill up the form', {
        autoClose: 3000, // Set the timeout for the error message (3 seconds)
      });
      return; // Prevent form submission if fields are empty
    }

    // Validate using Joi schema
    const { error } = schema.validate({
      newPassword,
    });

    if (error) {
      setError(error.details[0].message);
      toast.error(error.details[0].message, {
        autoClose: 3000, // Set the timeout for the error message (3 seconds)
      });
      return; // Only show validation message without triggering a toast
    }

    setError(null); // Clear any previous error messages

    // Prevent reset if old password is the same as the new password
    if (oldPassword === newPassword) {
      setError('New password cannot be the same as the old password');
      toast.error('New password cannot be the same as the old password', {
        autoClose: 3000, // Set the timeout for the error message (3 seconds)
      });
      return; // No toast, just set the error message
    }

    const resetPasswordData: ResetPasswordDTO = {
      email,
      username,
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const response = await resetPassword(resetPasswordData); // Call your API to reset the password
      setEmail('');
      setUsername('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword(''); // Clear the form fields

      toast.success('Password successfully updated!', {
        autoClose: 3000, // Set the timeout for the success message (3 seconds)
      }); // Show toaster with success message
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message, {
          autoClose: 3000, // Set the timeout for the error message (3 seconds)
        }); // Show toaster with error
      } else {
        setError('An unexpected error occurred.');
        toast.error('An unexpected error occurred.', {
          autoClose: 3000, // Set the timeout for the error message (3 seconds)
        });
      }
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


        <div className="mt-8 flex flex-col gap-y-4">
          <button type="submit" className="py-4 bg-violet-500 hover:bg-blue-600 text-white text-lg font-bold">
            Reset Password
          </button>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={onBackToLogin} // Function to go back to the login page
            className="ml-2 text-violet-500 text-base font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </form>

      {/* ToastContainer for feedback messages */}
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
