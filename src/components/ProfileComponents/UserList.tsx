import React, { useEffect, useState } from "react";
import { getAllUsersExceptCurrent, UserNameAndImage } from "../../api_service/user";
import { FaUserPlus } from "react-icons/fa";  // Add an icon for "Add as friend"

interface UserListProps {
  isDarkMode: boolean;
}

const UserList: React.FC<UserListProps> = ({ isDarkMode }) => {
  const [users, setUsers] = useState<UserNameAndImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userList = await getAllUsersExceptCurrent();
        setUsers(userList);
      } catch (err: any) {
        setError(err.message || "Failed to load user list");
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 overflow-hidden">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 overflow-hidden">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} overflow-hidden`}>
      {users.map((user, index) => (
        <div
          key={index}
          className={`flex items-center justify-between space-x-4 p-2 border-b hover:${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} rounded-md ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} overflow-hidden`}
        >
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
              src={`data:image/png;base64,${user.image.fileData}`}
              alt={`${user.name}'s profile`}
            />
            <span className="text-sm font-medium truncate max-w-[200px] overflow-hidden">
              {user.name}
            </span>
          </div>

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
