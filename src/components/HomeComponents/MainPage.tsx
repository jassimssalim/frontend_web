import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../utility/NavBar";
import Loading from "../../utility/Loading";
import NewPost from "../PostComponents/NewPost";
import PostList from "../PostComponents/PostList";
import * as postService from "../../api_service/post";
import { PostModel } from "../../api_service/post";
import ConfirmationModal from "../../utility/ConfirmationModal";
import { getProfileByUsername, UserProfile } from "../../api_service/user";
import UserList from "../ProfileComponents/UserList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../../utility/ThemeContext"; // Import the context

const MainPage = () => {
  
  const navigate = useNavigate();
  const [isDataChange, setIsDataChange] = useState(false);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    postService
      .getAllPosts()
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [isDataChange]);


  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Access global dark mode state and toggle function
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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

  // Apply the dark mode class globally to the document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("darkMode");
    localStorage.removeItem("theme");

    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/Entry");
    }, 1000);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);}


  const handleAdd = () => {
    setIsDataChange(!isDataChange);
  };

  const handleDelete = () => {
    setIsDataChange(!isDataChange);
  };

  const handleLoading = () => {
    setIsLoading(true);}

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="relative">
        <NavBar />
        {/* Main Content Section */}
        {isLoading ? (
          <Loading />
        ) : (
          <div>
      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex space-x-6 mt-20">
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
              <section className="flex-1 bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* New Post */}
                <NewPost onAdd={handleAdd} onLoading={handleLoading} />
                {/* Post */}
                <PostList
                  allPost={posts}
                  onDelete={handleDelete}
                  onLoading={handleLoading}
                />
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
    </div>
  )} </div> </>)
};

export default MainPage;
