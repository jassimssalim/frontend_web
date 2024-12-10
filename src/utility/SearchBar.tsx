import { useState } from "react";
import * as userService from "../api_service/user";
import { useDarkMode } from "./ThemeContext";
import { UserNameAndImage } from "../api_service/user";
import { Modal } from "flowbite-react";
import UserList from "../components/ProfileComponents/UserList";
import Loading from "./Loading";

const SearchBar = () => {
  const { isDarkMode } = useDarkMode();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [userList, setUserList] = useState<UserNameAndImage[]>([]);

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      const searchParam = e.target.value;
      if (searchParam) {
        if (searchParam.trim()) {
          userService.getUserBySearchParam(searchParam).then((response) => {
            let newUserList = response.data
            console.log(newUserList)
            setUserList(newUserList);
            setTimeout(() => setShowSearchBox(true), 100)
          });
        }
      }
    }
  };

  return (
    <>
    
      <div className="w-1/3">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className={`w-6 h-6 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className={`${
              isDarkMode
                ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            } border text-sm rounded-lg block w-full ps-10 p-2.5`}
            placeholder="Search using username or name..."
            onKeyDown={(events) => handleSearch(events)}
          />
        </div>
      </div> 
      <Modal
        className="bg-gray-600"
        show={showSearchBox}
        onClose={() => setShowSearchBox(false)}
        position="center"
        theme={{
          content: {
            base: `${isDarkMode? "bg-gray-800" : "bg-white"} w-3/4 rounded-lg`,
            inner: "bg-transparent",
          },
        }}
      >
        <Modal.Body><>
          {userList.length > 0? <><UserList isDarkMode={isDarkMode} userList={userList} /></> : <div className="text-center text-gray-500 dark:text-gray-400"><h2>No Results Found</h2></div>}
          
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <div></div>
          <button
              onClick={() => setShowSearchBox(false)}
              type="submit"
              className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-600"
            >
              Close
            </button>
            </div>
            </>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default SearchBar;
function useEffect(arg0: () => void, arg1: userService.UserNameAndImage[][]) {
    throw new Error("Function not implemented.");
}

