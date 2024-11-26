import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from '../../utility/ConfirmationModal';  // Import the Success component

const MainPage = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
    navigate("/Entry");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the modal
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Section */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">MySocial</h1>
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

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex space-x-6">
        {/* Left Side: Profile Info */}
        <aside className="w-1/4 bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-500">Software Engineer</p>
            <p className="text-sm text-gray-400">New York</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
        </aside>

        {/* Middle: Posts Section */}
        <section className="flex-1 bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* New Post */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4 mt-3">
              <button className="text-blue-500 hover:underline">
                Photo/Video
              </button>
              <button className="text-green-500 hover:underline">
                Feeling/Activity
              </button>
            </div>
          </div>

          {/* Example Post */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <h3 className="text-sm font-bold">John Doe</h3>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <p className="mt-4 text-gray-800">Feeling great today!</p>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <button className="hover:text-blue-500">Like</button>
              <button className="hover:text-blue-500">Comment</button>
              <button className="hover:text-blue-500">Share</button>
            </div>
          </div>
        </section>

        {/* Right Side: Suggestions */}
        <aside className="w-1/4 bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-800">Suggestions</h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-semibold">Jane Smith</p>
              <button className="text-sm text-blue-500 hover:underline">
                Add Friend
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-semibold">Alex Johnson</p>
              <button className="text-sm text-blue-500 hover:underline">
                Add Friend
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Reusable Confirmation Modal */}
      <ConfirmationModal
        isVisible={showLogoutModal}
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={handleCancelLogout}
      />
    </div>
  );
};

export default MainPage;
