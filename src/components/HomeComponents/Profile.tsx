import React from 'react';

const Profile = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-600 h-48">
        <div className="relative flex justify-center items-center h-full">
          <img 
            className="absolute top-0 left-0 w-full h-full object-cover" 
            src="https://via.placeholder.com/1500x500" 
            alt="Cover"
          />
          <div className="relative z-10 text-white">
            <div className="flex items-center space-x-4">
              <img 
                className="w-24 h-24 rounded-full border-4 border-white" 
                src="https://via.placeholder.com/100" 
                alt="Profile"
              />
              <div className="text-lg font-bold">John Doe</div>
            </div>
            <div className="mt-2 text-sm">Software Developer | Tech Enthusiast</div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="bg-white shadow-md px-4 py-2 flex justify-around">
        <button className="text-blue-600 font-semibold">Posts</button>
        <button className="text-gray-500">About</button>
        <button className="text-gray-500">Friends</button>
        <button className="text-gray-500">Photos</button>
      </div>

      {/* Posts Section */}
      <div className="max-w-4xl mx-auto py-4 px-6">
        <div className="bg-white rounded-lg shadow-md mb-4 p-4">
          <div className="flex items-center space-x-3">
            <img 
              className="w-10 h-10 rounded-full" 
              src="https://via.placeholder.com/40" 
              alt="User"
            />
            <div className="flex-1">
              <textarea 
                className="w-full p-2 border rounded-md" 
                placeholder="What's on your mind?" 
              />
            </div>
            <button className="text-blue-600">Post</button>
          </div>
        </div>

        {/* Example Post */}
        <div className="bg-white rounded-lg shadow-md mb-4 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              className="w-10 h-10 rounded-full" 
              src="https://via.placeholder.com/40" 
              alt="User"
            />
            <div>
              <div className="font-semibold">John Doe</div>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>
          </div>
          <p className="text-gray-800 mb-3">Just completed a new project! Feeling accomplished.</p>
          <img 
            className="w-full h-80 object-cover rounded-lg mb-3" 
            src="https://via.placeholder.com/500x300" 
            alt="Post"
          />
          <div className="flex space-x-6 text-sm text-gray-500">
            <button className="flex items-center space-x-2">
              <span className="material-icons">thumb_up</span>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2">
              <span className="material-icons">comment</span>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2">
              <span className="material-icons">share</span>
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Another Example Post */}
        <div className="bg-white rounded-lg shadow-md mb-4 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              className="w-10 h-10 rounded-full" 
              src="https://via.placeholder.com/40" 
              alt="User"
            />
            <div>
              <div className="font-semibold">Jane Smith</div>
              <div className="text-sm text-gray-500">1 day ago</div>
            </div>
          </div>
          <p className="text-gray-800 mb-3">Had an amazing time at the beach today!</p>
          <img 
            className="w-full h-80 object-cover rounded-lg mb-3" 
            src="https://via.placeholder.com/500x300" 
            alt="Post"
          />
          <div className="flex space-x-6 text-sm text-gray-500">
            <button className="flex items-center space-x-2">
              <span className="material-icons">thumb_up</span>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2">
              <span className="material-icons">comment</span>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2">
              <span className="material-icons">share</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
