import React from 'react';

interface ConfirmationModalProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDarkMode: boolean;  // Add the isDarkMode prop to handle the theme
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  message,
  onConfirm,
  onCancel,
  isDarkMode,  // Destructure the isDarkMode prop
}) => {
  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        className={`p-8 rounded-lg shadow-xl w-80 sm:w-96 md:w-1/3 text-center transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
      >
        <p className="text-lg mb-6 font-semibold">{message}</p>
        <div className="flex justify-center space-x-6 mt-4">
          <button
            onClick={onConfirm}
            className="bg-violet-600 text-white text-sm font-medium py-3 px-8 rounded-lg hover:bg-violet-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 text-sm font-medium py-3 px-8 rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
