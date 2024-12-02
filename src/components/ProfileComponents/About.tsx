import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { UserProfile, updateProfileByUsername } from "../../api_service/user"; // Import your API service

interface AboutProps {
  profile: UserProfile | null;
  updateProfile: (updatedProfile: UserProfile) => void;
}

const About: React.FC<AboutProps> = ({ profile, updateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(profile);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    if (tempProfile) {
      const username = localStorage.getItem("username");
      if (username) {
        try {
          await updateProfileByUsername(username, tempProfile);  // Call your update function
          updateProfile(tempProfile);  // Update the profile in the parent component immediately

        } catch (error) {
          console.error("Failed to update profile", error);
        }
      }


    }
    setIsEditing(false);
    localStorage.getItem("username");

  };

  const handleCancel = () => {
    setTempProfile(profile);  // Reset tempProfile to the current profile data
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempProfile((prev) => prev ? { ...prev, [name]: value } : prev);  // Safely update tempProfile
  };

  if (!profile) {
    return <div>Loading...</div>;  // Show loading state until profile data is available
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={tempProfile?.name || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={tempProfile?.username || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={tempProfile?.bio || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          {/* Graduate School Field */}
          <div>
            <label htmlFor="graduateSchool" className="block text-sm font-medium text-gray-700">
              Graduate School
            </label>
            <input
              type="text"
              id="graduateSchool"
              name="graduateSchool"
              value={tempProfile?.graduateSchool || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={tempProfile?.age || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Sex Field */}
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
              Sex
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              value={tempProfile?.sex || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Links Field */}
          <div>
            <label htmlFor="links" className="block text-sm font-medium text-gray-700">
              Links
            </label>
            <input
              type="url"
              id="links"
              name="links"
              value={tempProfile?.links || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={tempProfile?.email || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={tempProfile?.address || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              <FaSave className="mr-2" />
              Update
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-gray-700">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><strong>Graduate School:</strong> {profile.graduateSchool}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Sex:</strong> {profile.sex}</p>
          <p><strong>Links:</strong>{" "}
            <a
              href={profile.links}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {profile.links}
            </a>
          </p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
        </div>
      )}
    </div>
  );
};

export default About;
