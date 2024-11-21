import React from 'react';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for React Router v6

const WrongPath = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Redirect to Home page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Invalid URL or File Path</h1>
        <p className="text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>
        <button 
          onClick={handleRedirect}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default WrongPath;
