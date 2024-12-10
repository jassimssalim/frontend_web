import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteUser, updatePassword, userDeactivate } from '../../api_service/user';
import ConfirmationModal from '../../utility/ConfirmationModal';


interface SettingsProps {
  isDarkMode: boolean;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

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

      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const handleDeactivateUser = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      toast.error("Username not found in local storage.");
      return;
    }
  
    try {
      const response = await userDeactivate(username); // Change to userDeactivate
      toast.success("Account deactivated successfully!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("username");
  
      setTimeout(() => {
        navigate("/"); // Redirect after deactivation
      }, 2000);
    } catch (error) {
      toast.error("Failed to deactivate account. Please try again.");
    }
  };

  const showDeleteConfirmationModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const handleConfirm = () => {
    handleDeleteUser();
    setIsModalVisible(false);
  };

  const showLogoutConfirmationModal = () => setIsLogoutModalVisible(true);
  const handleLogoutCancel = () => setIsLogoutModalVisible(false);
  const handleLogoutConfirm = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username");

    toast.success("Logged out successfully!");

    setTimeout(() => {
      setIsLogoutModalVisible(false);
      navigate("/"); 
    }, 1000);
  };

  const showChangePasswordModal = () => setIsChangePasswordModalVisible(true);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
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
    <div className={`p-10 rounded-xl shadow-2xl max-w-4xl mx-auto transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-center">Account Settings</h1>

        {/* Change Password Section */}
        <div className={`flex items-center justify-between p-3 border-b rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <span className="text-default font-semibold">Change Password</span>
          <button
            onClick={showChangePasswordModal}
            className={`px-3 py-1.5 rounded-lg bg-violet-800 hover:bg-blue-600 text-white text-sm`}
          >
            Change
          </button>
        </div>

        {/* Logout Section */}
        <div className={`flex items-center justify-between p-3 border-b rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <span className="text-default font-semibold">Logout</span>
          <button
            onClick={showLogoutConfirmationModal}
            className={`px-3 py-1.5 rounded-lg bg-violet-800 hover:bg-blue-600 text-white text-sm`}
          >
            Logout
          </button>
        </div>

                {/* Deactivate Account */}

        <div className={`flex items-center justify-between p-3 border-b rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <span className="text-default font-semibold">Deactivate Account</span>
          <button
            onClick={showDeleteConfirmationModal}
            className={`px-3 py-1.5 rounded-lg bg-violet-800 hover:bg-blue-600 text-white text-sm`}
          >
            Deactivate
          </button>
        </div>

        {/* Delete Account */}
        <div className={`flex items-center justify-between p-3 border-b rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <span className="text-default font-semibold">Delete Account</span>
          <button
            onClick={showDeleteConfirmationModal}
            className={`px-3 py-1.5 rounded-lg bg-violet-800 hover:bg-blue-600 text-white text-sm`}
          >
            Delete
          </button>
        </div>



      
      </div>

  

      

      {/* Change Password Modal */}
      {isChangePasswordModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`rounded-lg p-4 space-y-4 w-80 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold text-center">Change Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
      />
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setIsChangePasswordModalVisible(false)}
          className="px-3 py-1.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleChangePassword}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
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
        isDarkMode={isDarkMode}  // Pass the dark mode state

      />
      {/* Deactivate Modal for Logout */}

      <ConfirmationModal
           isVisible={isModalVisible}
           message="Are you sure you want to deactivate your account? This action can be reversed by resetting your account."
          onConfirm={handleDeactivateUser} // Call handleDeactivateUser
         onCancel={handleCancel}
          isDarkMode={isDarkMode}
        />


      {/* Confirmation Modal for Logout */}
      <ConfirmationModal
        isVisible={isLogoutModalVisible}
        message="Are you sure you want to log out?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        isDarkMode={isDarkMode}  // Pass the dark mode state

      />
    </div>
  );
};

export default Settings;
