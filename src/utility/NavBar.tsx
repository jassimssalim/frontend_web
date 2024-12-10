import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useDarkMode } from "./ThemeContext";
import Loading from "../utility/Loading";
import SearchBar from './SearchBar';

const NavBar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to control loading spinner
  const navigate = useNavigate();

  // Access global dark mode state and toggle function
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("isDarkMode");
    localStorage.removeItem("userId")


    navigate("/entry");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); 
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); 
  };

  const handleProfileNavigation = () => {
    setIsLoading(true); 
    setTimeout(() => {
      setIsLoading(false); 
      navigate("/profile"); 
    }, 1000); 
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-10">
      {/* Display Loading Spinner */}
      {isLoading && <Loading />}

      <header
        className={`w-full border-0 shadow-none text-white box-border ${
          isDarkMode ? "bg-black" : "bg-violet-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold"> <Link to = "/home"> MoodSnap  </Link></h1>
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
                {/* Replace direct navigation with a click handler */}
                <button
                  onClick={handleProfileNavigation}
                  className="hover:underline"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogoutClick}
                  className="hover:underline"
                >
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
        isDarkMode={isDarkMode} // Pass the dark mode state
      />
    </div>
  );
};

export default NavBar;
