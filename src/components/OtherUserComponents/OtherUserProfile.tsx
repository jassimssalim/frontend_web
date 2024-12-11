import React, { useEffect, useState } from 'react'
import { FaStickyNote, FaUser, FaCog, FaHome } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { UserProfile, getProfileByUsername } from '../../api_service/user';
import { useDarkMode } from '../../utility/ThemeContext';
import OtherPost from './OtherPost';
import OtherAbout from './OtherAbout';
import { useGuardSecurity } from '../../utility/GuardContext';

const OtherUserProfile = () => {
    const param = useParams();
    const userNameParam = param.userName || ""
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("posts");
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();
    const {userLoggedIn} = useGuardSecurity();

    useEffect(() => {
      
      if (!userLoggedIn) {
        navigate("/");
      }
      
      const fetchUserProfile = async () => {
        const currentUser = localStorage.getItem("username")

        console.log("darkmode in others", isDarkMode)
        if (!userNameParam) {
          navigate("/entry");
          setLoading(false);
          return;
        }

        if(currentUser === userNameParam){
            navigate("/profile")
        }
  
        try {
          const userProfile = await getProfileByUsername(userNameParam);
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
  
    if (profile?.error) {
      return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <p className="text-gray-600">No profile found.</p>
          {/* Back to Home Button */}
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            onClick={() => navigate("/home")}
            className="text-white bg-violet-800 hover:bg-blue-600 p-5 rounded-full shadow-lg transform hover:scale-100 transition-all"
          >
            <FaHome className="text-4xl" />
          </button>
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-white bg-black rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </div>
        </div>
        </div>
      );
    }
  
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {/* Profile Header */}
        <div className="relative">
          <div className={`${isDarkMode ? 'bg-black' : 'bg-violet-200'} h-40`}></div>
          <div className="relative -mt-16 flex items-center space-x-6 px-8">
          <img
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                src={`data:image/png;base64,${profile?.image.fileData}`}
                 alt="Profile"
            />

            <div>
              <h1 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-3xl font-bold`}>{profile?.name }</h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} text-sm`}>{profile?.email}</p>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} text-sm`}>{profile?.bio || "No bio"}</p>
            </div>
          </div>
        </div>
  
        {/* Tabs */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-4">
            <button
              className={`flex items-center space-x-2 px-6 py-2 rounded-full ${activeTab === "posts"
                ? "bg-purple-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-600"}`}
              onClick={() => setActiveTab("posts")}
            >
              <FaStickyNote />
              <span>Posts</span>
            </button>
            <button
              className={`flex items-center space-x-2 px-6 py-2 rounded-full ${activeTab === "about"
                ? "bg-purple-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-600"}`}
              onClick={() => setActiveTab("about")}
            >
              <FaUser />
              <span>About</span>
            </button>
          </div>
        </div>
  
        {/* Content */}
        <div className="flex justify-center mt-8 px-6">
          <div className="flex flex-row space-x-8 max-w-7xl w-full">
            {/* Main Content */}
            <div className={`w-full shadow-md rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {activeTab === "posts" && <OtherPost userName={userNameParam}/>}
              {activeTab === "about" && <OtherAbout profile={profile}isDarkMode={isDarkMode}/>}
            </div>
          </div>
        </div>
  
        {/* Back to Home Button */}
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            onClick={() => navigate("/home")}
            className="text-white bg-violet-800 hover:bg-blue-600 p-5 rounded-full shadow-lg transform hover:scale-100 transition-all"
          >
            <FaHome className="text-4xl" />
          </button>
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-white bg-black rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </div>
        </div>
      </div>
    );
  };

export default OtherUserProfile