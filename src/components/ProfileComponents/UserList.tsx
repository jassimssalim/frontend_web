import React, { useEffect, useState } from "react";
import { getAllUsersExceptCurrent, UserNameAndImage } from "../../api_service/user";
import { FaUserPlus } from "react-icons/fa";  // Add an icon for "Add as friend"

const UserList = () => {
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
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600">Loading users...</p>
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

  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div key={index} className="flex items-center justify-between space-x-4 p-2 border-b border-gray-100 hover:bg-gray-50 rounded-md">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
              src={`data:image/png;base64,${user.image.fileData}`}
              alt={`${user.name}'s profile`}
            />
            <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
              {user.name}
            </span>
          </div>

          <button
            className="flex items-center justify-center text-indigo-500 text-sm hover:text-indigo-600 transition duration-150 ease-in-out"
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
