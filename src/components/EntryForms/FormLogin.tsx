import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { loginUser, LoginDTO } from '../../api_service/user';  // Import the loginUser API function
import Success from '../../toaster_utility/Success';  // Import the Success component

interface FormLoginProps {
  onSignUp: () => void;
  onForgotPassword: () => void; // New prop to trigger password reset
}

const FormLogin: React.FC<FormLoginProps> = ({ onSignUp, onForgotPassword }) => {
  const [loginData, setLoginData] = useState<LoginDTO>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);  // State for toast visibility
  const [toastMessage, setToastMessage] = useState('');  // State for toast message
  const navigate = useNavigate();  // Use useNavigate for redirection

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const message = await loginUser(loginData); // Call the login API function

      if (message === 200) {
        setToastMessage("Login successful!");
        setToastVisible(true);

        setTimeout(() => {
          setToastVisible(false);
          navigate("/home");
        }, 3000);

      } else {
        setError("Login failed!");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (err) {
      setError("Login failed. Please try again.");

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-white px-24 py-20 rounded-3xl border-2 border-gray-200 max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Please enter your details.</p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Username</label>
          <input
            name="username"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            name="password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}  {/* Error message */}


        <div className="mt-8 flex">
          <div></div>
          <button
            onClick={onForgotPassword} // Trigger the reset password form
            className="font-medium text-base text-violet-500"
          >
            Forgot Password
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={handleSubmit}  // Trigger login API call
            className="py-4 bg-violet-500 text-white text-lg font-bold"
          >
            Sign In
          </button>
          <p className="font-medium text-base">
            Don't have an account?{' '}
            <button
              onClick={onSignUp} // Trigger the form switch to register
              className="ml-2 text-violet-500 text-base font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Render Success Toast if toastVisible is true */}
      {toastVisible && (
        <Success
          message={toastMessage}
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
};

export default FormLogin;
