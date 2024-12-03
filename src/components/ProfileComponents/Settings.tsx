import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

import { deleteUser } from '../../api_service/user' // Import the deleteUser function
import ConfirmationModal from '../../utility/ConfirmationModal';  // Import the Success component


const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle delete user functionality
  const handleDeleteUser = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      toast.error("Username not found in local storage.");
      return;
    }

    try {
      const response = await deleteUser(username); // Call deleteUser function from user.ts
      toast.success("Account deleted successfully!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("username");




      // After successful deletion, navigate to the home page ("/")
      setTimeout(() => {
        navigate("/"); // Navigate to the entry page after 2 seconds to allow toast to show
      }, 2000);
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  // Show confirmation modal
  const showConfirmationModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle modal confirm action
  const handleConfirm = () => {
    handleDeleteUser(); // Proceed with account deletion
    setIsModalVisible(false); // Close the modal
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-8`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold">Settings</h1>

        {/* Dark Mode Setting */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Dark Mode</span>
          <select
            value={darkMode ? 'enabled' : 'disabled'}
            onChange={(e) => setDarkMode(e.target.value === 'enabled')}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
          >
            <option value="disabled">Disabled</option>
            <option value="enabled">Enabled</option>
          </select>
        </div>

        {/* Other Settings (e.g., Change Password, Notification Settings) */}

        {/* Delete Account */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg text-red-600">Delete Account</span>
          <button
            onClick={showConfirmationModal} // Show confirmation modal
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Toaster Component */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isVisible={isModalVisible} // Control modal visibility
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleConfirm} // Confirm action (delete account)
        onCancel={handleCancel} // Cancel action (close modal)
      />
    </div>
  );
};

export default Settings;
