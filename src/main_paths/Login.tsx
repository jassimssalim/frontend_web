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
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Login;
