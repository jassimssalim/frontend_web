import React, { useEffect, useState } from "react";
import { getAllUsersExceptCurrent, UserNameAndImage } from "../../api_service/user";
import { FaUserPlus } from "react-icons/fa"; // Add an icon for "Add as friend"
import { Link } from "react-router-dom";

interface UserListProps {
  isDarkMode: boolean;
  userList?: UserNameAndImage[];
}

const UserList: React.FC<UserListProps> = ({ isDarkMode, userList }) => {
  const [users, setUsers] = useState<UserNameAndImage[]>(userList ?? []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.add("dark");
      rootElement.style.backgroundColor = "#111827"; 
    } else {
      rootElement.classList.remove("dark");
      rootElement.style.backgroundColor = "#ffffff"; 
    }
  }, [isDarkMode]);
  
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userList = await getAllUsersExceptCurrent();
        console.log(userList);
        setUsers(userList);
      } catch (err: any) {
        setError(err.message || "Failed to load user list");
      } finally {
        setLoading(false);
      }
    };
    if (userList) {
      setLoading(false);
    } else fetchUserList();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
        }`}
      >
        {/* Spinner */}
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="mt-2 text-sm">
            Loading people you may know...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
        }`}
      >
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

   // Show message if there are no users
   if (users.length === 0) {
    return (
      <div
        className={`min-h-1/2 flex justify-center items-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
        }`}
      >
        <p className="text-sm text-gray-500">No users found.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 overflow-hidden`}>
      {users.map((user, index) => (
        <div
          key={index}
          className={`flex items-center justify-between space-x-4 p-2 border-b rounded-md ${
            isDarkMode
              ? "hover:bg-gray-700 text-white border-gray-700"
              : "hover:bg-gray-200 text-gray-800 border-gray-100"
          }`}
        >
          {/* User Info */}
          <div className="flex items-center space-x-2 flex-1">
            <img
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
              src={`data:image/png;base64,${user.image.fileData}`}
              alt={`${user.name}'s profile`}
            />
            <Link
              to={`/profile/${user.userName}`}
              target="_blank"
              className="truncate max-w-[200px]"
            >
              <span className="text-sm font-medium truncate hover:text-blue-800">
                {user.name}
              </span>
            </Link>
          </div>

          {/* Add as Friend Button */}
          <button
            className="flex items-center justify-center text-indigo-500 text-sm hover:text-blue-800 transition duration-150 ease-in-out"
          >
            <FaUserPlus className="mr-1 text-lg" />
            <span className="hidden sm:inline">Add as friend</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
