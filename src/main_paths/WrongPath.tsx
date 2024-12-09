import React from 'react';
import { useNavigate } from 'react-router-dom';

const WrongPath = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Redirect to Home page
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-gray-900 text-white overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-700 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-40"></div>

      {/* Content */}
      <div className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-2xl max-w-md">
        <h1 className="text-4xl font-extrabold text-red-500 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-purple-400"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default WrongPath;
