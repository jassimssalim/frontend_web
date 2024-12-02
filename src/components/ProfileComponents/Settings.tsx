import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-8`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold">Settings</h1>

        {/* Dark Mode Setting */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Dark Mode</span>
          <select
            value={darkMode ? 'enabled' : 'disabled'}
            onChange={(e) => setDarkMode(e.target.value === 'enabled')}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
          >
            <option value="disabled">Disabled</option>
            <option value="enabled">Enabled</option>
          </select>
        </div>

        {/* Change Password */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Change Password</span>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            Change
          </button>
        </div>

        {/* Notification Settings */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Notification Settings</span>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            Edit
          </button>
        </div>

        {/* Privacy Settings */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Privacy Settings</span>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            Edit
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg">Language</span>
          <select className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg">
          <span className="text-lg text-red-600">Delete Account</span>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
