import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { useDarkMode } from './ThemeContext';
import SearchBar from './SearchBar';

const NavBar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Access global dark mode state and toggle function
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username"); 

    navigate("/entry");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the modal
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Close the modal
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-10">
      <header className={`w-full border-0 shadow-none text-white box-border ${isDarkMode ? "bg-black" : "bg-violet-600"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">MoodSnap.</h1>
          <div></div>
          <SearchBar/>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link to="/home" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogoutClick} className="hover:underline">
                  Logout
                </button>
              </li>
              <li>
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? "🌙" : "☀️"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Reusable Confirmation Modal */}
      <ConfirmationModal
        isVisible={showLogoutModal}
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={handleCancelLogout}
        isDarkMode={isDarkMode}  // Pass the dark mode state
      />
    </div>
  );
};

export default NavBar;
