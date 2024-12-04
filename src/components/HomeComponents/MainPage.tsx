import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from '../../utility/ConfirmationModal';  
import { getProfileByUsername, UserProfile } from "../../api_service/user";
import UserList from "../ProfileComponents/UserList";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const MainPage = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const username = localStorage.getItem("username"); // Assuming the username is stored in localStorage
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
    setShowLogoutModal(true); // Show the modal
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Section */}
      <header className="bg-violet-600 text-white">
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
                <button onClick={handleLogoutClick} className="hover:underline">
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
              <h2 className="mt-4 text-xl font-bold text-gray-800">{userProfile.name}</h2>
              <p className="text-gray-500">{userProfile.email}</p>
              <p className="text-sm text-gray-400">{userProfile.address || "Location not available"}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
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
          <h2 className="text-lg font-bold text-gray-800">People you may know</h2>
          <UserList />
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
