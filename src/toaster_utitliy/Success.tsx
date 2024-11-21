import React from 'react';

// Define the types for props
interface SuccessProps {
  message: string; // The message to be displayed
  onClose: () => void; // Function to call when the toast is closed
}

const Success: React.FC<SuccessProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 z-50 bg-green-500 text-white p-4 rounded-md shadow-md max-w-xs w-full">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{message}</span>
        <button onClick={onClose} className="text-white">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Success;
