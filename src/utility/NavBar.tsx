import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'

const NavBar = () => {

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate()

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
    <div className="fixed top-0 left-0 right-0">
    <header className="bg-gradient-to-r from-purple-600 to-pink-800 text-white">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">MoodSnap.</h1>
      <nav>
        <ul className="flex space-x-6">
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
            <button
              onClick={handleLogoutClick}
              className="hover:underline"
            >
              Logout
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
      />
  </div>
  )
}

export default NavBar