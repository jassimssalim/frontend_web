import React from 'react';
import { useDarkMode } from "../../utility/ThemeContext"; // Import the hook

const Post = () => {
  const { isDarkMode } = useDarkMode(); // Use dark mode state from context

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="font-semibold text-xl">Post</h2>
      <p>This is a post content.</p>
    </div>
  );
};

export default Post;
