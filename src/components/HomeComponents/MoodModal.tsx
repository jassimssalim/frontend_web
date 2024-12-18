import React, { useState, useEffect } from 'react';
import { AiOutlineReload } from 'react-icons/ai'; // Import reload icon from react-icons

interface MoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean; // Add darkMode prop
}

const MoodModal: React.FC<MoodModalProps> = ({ isOpen, onClose, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Default to an empty string
  const [quote, setQuote] = useState<string>(''); // To store the fetched quote
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state

  const categories = ['success', 'courage', 'alone', 'best', 'happiness', 'freedom'];

  // Fetch quote based on category
  const fetchQuote = async () => {
    if (!selectedCategory) {
      setQuote(''); // Reset the quote if no category is selected
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${selectedCategory}`,
        {
          headers: {
            'X-Api-Key': 'dAmBbba73H8mDJxHkeiQkQ==rOJxy4KtlpTpaa4n', // Your API key
          },
        }
      );
      const data = await response.json();
      setQuote(data[0]?.quote || 'No quote found');
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to fetch quote.');
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to fetch quote when category changes
  useEffect(() => {
    if (isOpen && selectedCategory) {
      fetchQuote();
    }
  }, [isOpen, selectedCategory]);

  // Function to handle category reset
  const resetCategory = () => {
    setSelectedCategory('');
    setQuote('');
  };

  if (!isOpen) return null; // Return nothing if modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div
        className={`p-6 rounded-lg shadow-lg w-[80vw] md:w-[60vw] lg:w-[40vw] ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        <h2 className="text-xl font-bold mb-4">Select according to how you feel</h2>

        {/* Category Selection and Reload Button */}
        <div className="mb-4 flex items-center space-x-4">
          {/* Category Dropdown */}
          <div className="w-1/2">
            <label htmlFor="category" className="block mb-2">Select Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="" >- Select here -</option> {/* Default option */}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Reload Quote Button */}
          {selectedCategory && !loading && (
            <button
              onClick={fetchQuote}
              className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
            >
              <AiOutlineReload size={20} /> <span>Reload Quote</span>
            </button>
          )}
        </div>

        {/* Display Quote */}
        <div className="mb-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>{quote}</p>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodModal;
