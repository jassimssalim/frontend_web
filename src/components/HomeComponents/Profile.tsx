import React, { useEffect, useState } from "react";
import { getProfileByUsername, UserProfile } from "../../api_service/user"; 
import { useNavigate } from "react-router-dom"; 
import Posts from "../ProfileComponents/Post"; 
import About from "../ProfileComponents/About"; 
import Settings from "../ProfileComponents/Settings"; 

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("posts"); // State to track active tab
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-600">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture */}
          <img
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md"
            src={`data:image/png;base64,${profile.image.fileData}`}
            alt="Profile"
          />
          <h1 className="text-3xl font-semibold text-gray-900">{profile.name}</h1>
          <p className="text-sm text-gray-600">{profile.email}</p>
          <p className="text-sm text-gray-600">{profile.bio}</p>

        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mt-6 space-x-10 border-t border-gray-200 pt-4">
          <button
            className={`py-2 px-6 text-lg font-medium ${activeTab === "posts" ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`py-2 px-6 text-lg font-medium ${activeTab === "about" ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`py-2 px-6 text-lg font-medium ${activeTab === "settings" ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Render Active Tab Content */}
      <div className="px-8 py-6">
        {activeTab === "posts" && <Posts />}
        {activeTab === "about" && <About />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Profile;
