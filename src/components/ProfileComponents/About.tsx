import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaUser, FaCalendarAlt, FaVenusMars, FaUniversity, FaMapMarkerAlt, FaLink, FaPhone } from "react-icons/fa";
import { UserProfile, updateProfileByUsername } from "../../api_service/user";
import ConfirmationModal from '../../utility/ConfirmationModal'; 

interface AboutProps {
  profile: UserProfile | null;
  updateProfile: (updatedProfile: UserProfile) => void;
}

const About: React.FC<AboutProps> = ({ profile, updateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(profile);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    setIsModalVisible(true); // Show confirmation modal
  };

  const handleConfirmSave = async () => {
    setIsModalVisible(false); // Hide modal
    if (tempProfile) {
      const username = localStorage.getItem("username");
      if (username) {
        try {
          await updateProfileByUsername(username, tempProfile); // Call your update function
          updateProfile(tempProfile); // Update the profile in the parent component
        } catch (error) {
          console.error("Failed to update profile", error);
        }
      }
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile); // Reset tempProfile to the current profile data
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTempProfile((prev) => (prev ? { ...prev, [name]: value } : prev)); // Safely update tempProfile
  };

  if (!profile) {
    return <div>Loading...</div>; // Show loading state until profile data is available
  }

  return (
    <div className="bg-gray-50 p-10 rounded-xl shadow-2xl max-w-4xl mx-auto transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          {isEditing ? "Edit your information" : "Additional Information About Me"}
        </h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-all duration-300 ease-in-out"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Name Field */}
    <div className="space-y-2">
      <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={tempProfile?.name || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Bio Field */}
    <div className="space-y-2">
      <label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</label>
      <textarea
        id="bio"
        name="bio"
        rows={4}
        value={tempProfile?.bio || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Email Field */}
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={tempProfile?.email || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Phone Field */}
    <div className="space-y-2">
      <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={tempProfile?.phone || ""}
        onChange={handleChange}
        placeholder="123-456-7890"
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Age Field */}
    <div className="space-y-2">
      <label htmlFor="age" className="text-sm font-medium text-gray-700">Age</label>
      <input
        type="number"
        id="age"
        name="age"
        value={tempProfile?.age || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Sex Field */}
    <div className="space-y-2">
      <label htmlFor="sex" className="text-sm font-medium text-gray-700">Sex</label>
      <select
        id="sex"
        name="sex"
        value={tempProfile?.sex || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="LGBTQ">LGBTQ</option>
      </select>
    </div>

    {/* Graduate School Field */}
    <div className="space-y-2">
      <label htmlFor="graduateSchool" className="text-sm font-medium text-gray-700">Graduate School</label>
      <input
        type="text"
        id="graduateSchool"
        name="graduateSchool"
        value={tempProfile?.graduateSchool || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Address Field */}
    <div className="space-y-2">
      <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        value={tempProfile?.address || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Links Field */}
    <div className="space-y-2">
      <label htmlFor="links" className="text-sm font-medium text-gray-700">Links</label>
      <input
        type="url"
        id="links"
        name="links"
        value={tempProfile?.links || ""}
        onChange={handleChange}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
      />
    </div>

    <div className="flex items-center justify-between mt-6 space-x-4">
      <button
        onClick={handleSave}
        className="flex items-center px-8 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
      >
        <FaSave className="mr-2" />
        Save
      </button>
      <button
        onClick={handleCancel}
        className="flex items-center px-8 py-3 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out"
      >
        <FaTimes className="mr-2" />
        Cancel
      </button>
    </div>
  </div>

      ) : (
        <div className="space-y-8 text-gray-800">
          {/* Username Section */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-gray-600" />
            <div className="text-lg font-semibold text-gray-900">{profile.username}</div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Age */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Age</h3>
              </div>
              <p className="text-gray-700">{profile.age}</p>
            </div>
             {/* Sex */}
             <div className="space-y-2">
               <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Phone Number</h3>
              </div>
              <p className="text-gray-700">{profile.phone}</p>
            </div>

            {/* Sex */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaVenusMars className="text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Sex</h3>
              </div>
              <p className="text-gray-700">{profile.sex}</p>
            </div>

            {/* Graduate School */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaUniversity className="text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Graduate School</h3>
              </div>
              <p className="text-gray-700">{profile.graduateSchool}</p>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
              </div>
              <p className="text-gray-700">{profile.address}</p>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaLink className="text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Links</h3>
              </div>
              <p className="text-gray-700">{profile.links}</p>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      <ConfirmationModal
        isVisible={isModalVisible}
        message="Are you sure you want to save the changes?"
        onConfirm={handleConfirmSave}
        onCancel={() => setIsModalVisible(false)} // Close the modal
      />
    </div>

    
  );
};

export default About;