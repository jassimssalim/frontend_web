import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteUser, updatePassword } from '../../api_service/user';
import ConfirmationModal from '../../utility/ConfirmationModal';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle state
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility for delete and logout
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // New state for logout confirmation modal
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false); // New state for change password modal
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const navigate = useNavigate();

  // Handle delete user functionality
  const handleDeleteUser = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      toast.error("Username not found in local storage.");
      return;
    }

    try {
      const response = await deleteUser(username);
      toast.success("Account deleted successfully!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("username");

      // After successful deletion, navigate to the home page
      setTimeout(() => {
        navigate("/"); // Navigate to the entry page after 2 seconds
      }, 2000);
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const showDeleteConfirmationModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    handleDeleteUser();
    setIsModalVisible(false);
  };

  // Handle logout functionality with confirmation modal
  const showLogoutConfirmationModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username");

    // Show success message after logout
    toast.success("Logged out successfully!");

    // Add a delay before navigating to ensure toast shows
    setTimeout(() => {
      setIsLogoutModalVisible(false);
      navigate("/");
    }, 1000);
  };

  // Show change password modal
  const showChangePasswordModal = () => {
    setIsChangePasswordModalVisible(true);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      // Use the updated DTO for password change
      await updatePassword({
        username: localStorage.getItem("username") || '',
        newPassword,
        confirmPassword,
      });
      toast.success("Password changed successfully!");
      setIsChangePasswordModalVisible(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 rounded-xl shadow-2xl max-w-4xl mx-auto transition-all duration-300 ease-in-out">
      <div className="space-y-8">
        <h1 className="text-3xl font-semibold text-center">Account Settings</h1>

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

        {/* Change Password Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Change Password</span>
          <button
            onClick={showChangePasswordModal}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Change
          </button>
        </div>

        {/* Logout Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Logout</span>
          <button
            onClick={showLogoutConfirmationModal}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Logout
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Delete Account</span>
          <button
            onClick={showDeleteConfirmationModal}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {isChangePasswordModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 space-y-4 w-96">
            <h2 className="text-2xl font-semibold text-center">Change Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsChangePasswordModalVisible(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Confirmation Modal for Deleting Account */}
      <ConfirmationModal
        isVisible={isModalVisible}
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Confirmation Modal for Logout */}
      <ConfirmationModal
        isVisible={isLogoutModalVisible}
        message="Are you sure you want to log out?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </div>
  );
};

export default Settings;
