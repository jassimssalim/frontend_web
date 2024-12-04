import React, { useEffect, useState } from "react";
import { getAllUsersExceptCurrent, UserNameAndImage } from "../../api_service/user";

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
        <div key={index} className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full border-2 border-indigo-500"
            src={`data:image/png;base64,${user.image.fileData}`}
            alt={`${user.name}'s profile`}
          />
          <span className="font-medium text-gray-900">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
