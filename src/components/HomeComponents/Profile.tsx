import React, { useEffect, useState } from "react";
import { getProfileByUsername, UserProfile } from "../../api_service/user";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Import the Home icon from React Icons
import Posts from "../ProfileComponents/Post";
import About from "../ProfileComponents/About";
import Settings from "../ProfileComponents/Settings";

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("posts");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const username = localStorage.getItem("username");

      if (!username) {
        navigate("/Entry");
        setLoading(false);
        return;
      }

      try {
        const userProfile = await getProfileByUsername(username);
        setProfile(userProfile);
      } catch (err: any) {
        setError(err.message || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const updateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile); // Update the profile immediately after editing
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-xl p-6 mx-auto max-w-7xl">
        <div className="flex items-center space-x-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg"
              src={`data:image/png;base64,${profile.image.fileData}`}
              alt="Profile"
            />
          </div>

          {/* Profile Info */}
          <div className="flex flex-col justify-center space-y-2">
            <h1 className="text-4xl font-semibold text-gray-900">{profile.name}</h1>
            <p className="text-sm text-gray-600">{profile.email}</p>
            <p className="text-sm text-gray-600">{profile.bio}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mt-6 space-x-12 border-t border-gray-200 pt-4">
          <button
            className={`py-3 px-8 text-lg font-medium ${activeTab === "posts" ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`py-3 px-8 text-lg font-medium ${activeTab === "about" ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`py-3 px-8 text-lg font-medium ${activeTab === "settings" ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex justify-center mt-8">
        <div className="flex flex-row space-x-12 max-w-7xl w-full px-6">
          {/* Sidebar (Optional) */}
          <div className="w-1/4 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Friends</h2>
          </div>

          {/* Main Content */}
          <div className="w-3/4">
            <div className="bg-white shadow-md rounded-xl p-6">
              {activeTab === "posts" && <Posts />}
              {activeTab === "about" && <About profile={profile} updateProfile={updateProfile} />}
              {activeTab === "settings" && <Settings />}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Button (Floating at Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={() => navigate("/home")}
          className="text-white  bg-violet-800 hover:bg-blue-600 p-8 rounded-full shadow-lg transform hover:scale-110 transition-all"
        >
          {/* Home Icon */}
          <FaHome className="text-4xl" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-white bg-black rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
          Home
        </div>
      </div>
    </div>
  );
};

export default Profile;
