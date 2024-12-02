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
      {/* Back to Home Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => navigate("/home")}
          className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>

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
    </div>
  );
};

export default Profile;
