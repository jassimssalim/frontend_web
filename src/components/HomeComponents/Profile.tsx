import React, { useEffect, useState } from "react";
import { getProfileByUsername, UserProfile } from "../../api_service/user"; // Adjust the path to your `user.ts` file

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const username = localStorage.getItem("username");

      if (!username) {
        setError("No username found in localStorage");
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
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <p>No profile found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <div className="flex flex-col items-center pt-8 pb-6">
          <img
            className="w-28 h-28 rounded-full border-4 border-blue-500"
            src={`data:image/png;base64,${profile.image.fileData}`}
            alt="Profile"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">{profile.name}</h1>
          <p className="mt-2 text-gray-600 text-sm">{profile.email}</p>
        </div>
        <div className="flex justify-center space-x-8 border-t border-gray-200 py-4">
          <button className="text-blue-600 font-semibold hover:text-blue-800">
            Posts
          </button>
          <button className="text-gray-500 hover:text-gray-700">About</button>
          <button className="text-gray-500 hover:text-gray-700">Friends</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* New Post Section */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="flex items-center space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src={`data:image/png;base64,${profile.image.fileData}`}
              alt="User"
            />
            <textarea
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`What's on your mind, ${profile.name}?`}
              rows={2}
            ></textarea>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
              Post
            </button>
          </div>
        </div>

        {/* Example Post */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="flex items-center space-x-4 mb-3">
            <img
              className="w-10 h-10 rounded-full"
              src={`data:image/png;base64,${profile.image.fileData}`}
              alt="User"
            />
            <div>
              <h2 className="font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Just completed a new project! Feeling accomplished.
          </p>
          <img
            className="w-full rounded-lg"
            src="https://via.placeholder.com/500x300"
            alt="Post"
          />
          <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span className="material-icons">thumb_up</span>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span className="material-icons">comment</span>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span className="material-icons">share</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
