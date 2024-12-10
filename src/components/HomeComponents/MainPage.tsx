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

import MoodModal from './MoodModal'; // Import MoodModal


const MainPage = () => {
  const navigate = useNavigate();
  const [isDataChange, setIsDataChange] = useState(false);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);


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

  const handleToast = () => {

  }
  const handleAdd = () => {
    setIsDataChange(!isDataChange);
    setTimeout(() => {
      toast.success('Post successfully added!', {
        position: 'top-right', 
        autoClose: 5000,
      });
    }, 100);
    
  };


  const handleDelete = () => {
    setIsDataChange(!isDataChange);
    setTimeout(() => {
      toast.success('Post successfully deleted!', {
        position: 'top-right', 
        autoClose: 5000,
      });
    }, 100);
  };

  const handleLoading = () => {
    setIsLoading(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };


  const handleOpenModal = () => {
    setIsMoodModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsMoodModalOpen(false); // Close the modal
  };


  return (
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}> {/* Add dark mode classes */}
      <div className="relative">
        <NavBar />

        {/* Main Content Section */}
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <main className="max-w-7xl mx-auto px-6 py-8 flex space-x-6 mt-16">
              {/* Left Side: Profile Info */}
              <aside className="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 max-h-[350px] overflow-y-auto flex-shrink-0">
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
                    <p className="text-gray-500 dark:text-gray-300 text-default">
                      {userProfile.email}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-400">
                      {userProfile.address || "Location not available"}
                    </p>
                     <button
                       onClick={handleOpenModal}
                     className=" bg-violet-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-5"
                         >
                    Click Me!
                   </button>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </aside>

              {/* Middle: Posts Section */}
              <section className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 overflow-y-auto">
                <NewPost onAdd={handleAdd} onLoading={handleLoading} />
                <PostList allPost={posts} onDelete={handleDelete} onLoading={handleLoading} />
              </section>

              {/* Right Side: Suggestions */}
              <aside className="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 space-y-6 flex-shrink-0 h-full">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  People you may know
                </h2>
                <UserList isDarkMode={isDarkMode} />
              </aside>
            </main>
          </div>
        )}

      {/* Mood Modal */}
      <MoodModal isOpen={isMoodModalOpen} onClose={handleCloseModal} darkMode = {isDarkMode}/>
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
          isDarkMode={isDarkMode} // Pass the dark mode state
        />
      </div>
    </div>
  );
};

export default MainPage;
