import React, { useState } from 'react';
import FormLogin from '../components/EntryForms/FormLogin';
import FormRegister from '../components/EntryForms/FormRegister';
import ResetPassword from '../components/EntryForms/ResetPassword'; // Import ResetPassword component

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false); // New state for password reset

  // Function to toggle between login and register forms
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setIsResettingPassword(false); // Reset password state when switching forms
  };

  // Function to show reset password form
  const showResetPasswordForm = () => {
    setIsResettingPassword(true);
  };

  // Function to go back to login form from reset password
  const backToLoginFromReset = () => {
    setIsResettingPassword(false);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        {/* Conditionally render the login, register, or reset password form */}
        {isResettingPassword ? (
          <ResetPassword onBackToLogin={backToLoginFromReset} />
        ) : isRegistering ? (
          <FormRegister onSignIn={toggleForm} />
        ) : (
          <FormLogin onSignUp={toggleForm} onForgotPassword={showResetPasswordForm} />
        )}
      </div>

      {/* Right side - Social Media Style Design */}
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
        {/* Hero Image or Illustration */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3184323/pexels-photo-3184323.jpeg?cs=srgb&dl=group-of-people-seated-around-table-discussing-3184323.jpg&fm=jpg" // Replace with your desired image URL
            alt="Hero Image"
            className="object-cover w-full h-full opacity-60"
          />
        </div>
        
        {/* Optional Overlay for the Hero Section */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50"></div>

        {/* Content inside the right section */}
        <div className="relative z-10 text-center text-white px-6 md:px-12">
          <h1 className="text-4xl font-bold mb-6">HEY THERE!</h1>
          <p className="text-xl font-medium mb-4">Connect with people you care about</p>
          <p className="text-lg mb-6">Log in to continue your journey...</p>
        </div>

        {/* Subtle Background Blur */}
        <div className="w-full h-1/2 absolute bottom-0 bg-white/20 backdrop-blur-sm" />
      </div>
    </div>
  );
};

export default Login;
