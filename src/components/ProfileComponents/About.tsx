import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

interface AboutInfo {
  name: string;
  bio: string;
  graduateSchool: string;
  age: number;
  sex: string;
  links: string;
  email: string;
  address: string;
}

const About: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>({
    name: "John Doe",
    bio: "I’m a passionate software developer, building intuitive web and mobile experiences.",
    graduateSchool: "Stanford University",
    age: 29,
    sex: "Male",
    links: "https://johndoe.dev",
    email: "johndoe@example.com",
    address: "123 Tech Street, Innovation City, USA",
  });
  const [tempInfo, setTempInfo] = useState<AboutInfo>({ ...aboutInfo });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setAboutInfo(tempInfo);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setTempInfo(aboutInfo);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempInfo((prev) => ({ ...prev, [name]: value }));
  };

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
          {/** Form Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={tempInfo.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={tempInfo.bio}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="graduateSchool" className="block text-sm font-medium text-gray-700">
                Graduate School
              </label>
              <input
                type="text"
                id="graduateSchool"
                name="graduateSchool"
                value={tempInfo.graduateSchool}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={tempInfo.age}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
                Sex
              </label>
              <input
                type="text"
                id="sex"
                name="sex"
                value={tempInfo.sex}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="links" className="block text-sm font-medium text-gray-700">
                Links
              </label>
              <input
                type="url"
                id="links"
                name="links"
                value={tempInfo.links}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={tempInfo.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={tempInfo.address}
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
              Save
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
          <p><strong>Name:</strong> {aboutInfo.name}</p>
          <p><strong>Bio:</strong> {aboutInfo.bio}</p>
          <p><strong>Graduate School:</strong> {aboutInfo.graduateSchool}</p>
          <p><strong>Age:</strong> {aboutInfo.age}</p>
          <p><strong>Sex:</strong> {aboutInfo.sex}</p>
          <p>
            <strong>Links:</strong>{" "}
            <a
              href={aboutInfo.links}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {aboutInfo.links}
            </a>
          </p>
          <p><strong>Email:</strong> {aboutInfo.email}</p>
          <p><strong>Address:</strong> {aboutInfo.address}</p>
        </div>
      )}
    </div>
  );
};

export default About;
