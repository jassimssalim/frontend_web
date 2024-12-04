import React from 'react';

interface ConfirmationModalProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-72 sm:w-96 text-center">
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-violet-600 text-white text-xs font-semibold py-2 px-6 rounded-full hover:bg-violet-700 transition duration-200"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-600 text-xs font-semibold py-2 px-6 rounded-full hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
