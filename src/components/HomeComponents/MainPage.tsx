import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  // Handle logout logic (you can replace this with actual logout logic)
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Navbar Section */}
      <div className="w-full p-4 bg-blue-600 text-white text-center font-bold m-0">
        <nav>
          <ul className="flex justify-center space-x-6">
            <li>
              <Link to="/home" className="text-white hover:text-gray-200">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                className="text-white hover:text-gray-200">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Section */}
      <div className="flex w-full max-w-7xl space-x-6 p-4">
        {/* Left Side: Profile Information (Wide) */}
        <div className="w-1/2 bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <h2 className="mt-4 text-lg font-bold">John Doe</h2>
            <p className="text-gray-500">Software Engineer</p>
            <p className="text-sm text-gray-400">Location: New York</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Edit Profile</button>
          </div>
        </div>

        {/* Middle: Post Section */}
        <div className="flex-2 w-full bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <input
              type="text"
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button className="text-blue-500">Photo/Video</button>
            <button className="text-green-500">Feeling/Activity</button>
          </div>
        </div>

        {/* Right Side: Blue Background Only (Wider) */}
        <div className="flex-1 bg-blue-600 rounded-lg shadow-md p-6"></div>
      </div>

      {/* Wall Posts Section */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Example Post */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-bold">John Doe</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <p>Feeling great today!</p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <button>Like</button>
            <button>Comment</button>
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
