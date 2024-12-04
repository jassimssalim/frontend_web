import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from '../../utility/ConfirmationModal';  // Import the Success component
import PostList from "../PostComponents/PostList";
import NewPost from "../PostComponents/NewPost";
import NavBar from "../../utility/NavBar";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <NavBar/>
      {/* Main Content Section */}
      <main className="mt-10 max-w-7xl mx-auto px-6 py-8 flex space-x-6">
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
         <NewPost/>

          {/* Post */}
          <PostList isAllPost={true}/>
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
      
    </div>
  );
};

export default MainPage;
