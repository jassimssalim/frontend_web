import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../utility/ConfirmationModal";
import { getProfileByUsername, UserProfile } from "../../api_service/user";
import UserList from "../ProfileComponents/UserList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      const username = localStorage.getItem("username");
      if (username) {
        try {
          const profileData = await getProfileByUsername(username);
          setUserProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          toast.error("Failed to load profile data.");
        }
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/Entry");
    }, 1000);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Navbar Section */}
      <header className="bg-violet-600 text-white dark:bg-violet-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">MoodSnap.</h1>
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
                  onClick={() => setIsDarkMode((prev) => !prev)}
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

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex space-x-6">
        {/* Left Side: Profile Info */}
        <aside className="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          {userProfile ? (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full">
                {userProfile.image.fileData && (
                  <img
                    src={`data:image/jpeg;base64,${userProfile.image.fileData}`}
                    alt={userProfile.username}
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
                {userProfile.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-300">{userProfile.email}</p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                {userProfile.address || "Location not available"}
              </p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </aside>

        {/* Middle: Posts Section */}
        <section className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          {/* New Post */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
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
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-bold dark:text-white">John Doe</h3>
                <p className="text-xs text-gray-500 dark:text-gray-300">2 hours ago</p>
              </div>
            </div>
            <p className="mt-4 text-gray-800 dark:text-gray-100">
              Feeling great today!
            </p>
            <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-300">
              <button className="hover:text-blue-500">Like</button>
              <button className="hover:text-blue-500">Comment</button>
              <button className="hover:text-blue-500">Share</button>
            </div>
          </div>
        </section>

        {/* Right Side: Suggestions */}
        <aside className="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            People you may know
          </h2>
          <UserList isDarkMode={isDarkMode} />
          </aside>
      </main>

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
