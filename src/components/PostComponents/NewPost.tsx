import React, { useEffect, useState } from "react";
import * as postService from "../../api_service/post";
import * as userService from "../../api_service/user";
import { UserProfile } from "../../api_service/user";
import Joi from "joi";

export interface PostData {
  userId: number;
  content: string;
  photo: File | null; // Changed 'image' to 'file' to match the API
}

const NewPost = () => {
  const [postUser, setUser] = useState<UserProfile>();
  const username = localStorage.getItem("username");
  const [errors, setErrors] = useState<any>({});
  const [postData, setPostData] = useState<PostData>({
    userId: 1,
    content: "",
    photo: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    //get user info
    if (username) {
      userService
        .getProfileByUsername(username)
        .then((response) => {
          console.log("user data", response);
          setUser(response);
          setPostData({ ...postData, userId: response.id });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("napasok dito");
    setPostData({ ...postData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPostData({ ...postData, photo: file });
  };

  // Joi validation schema
  const validationSchema = Joi.object({
    content: Joi.string().required().label("Content"),
    userId: Joi.number().allow().label("UserId"),
    photo: Joi.any().allow().label("Photo"),
  });

  // Handle form submission
  const handleSubmit = async () => {
    console.log("editoa");
    const { error } = validationSchema.validate(postData, {
      abortEarly: false,
    });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      console.log("may error", newErrors);
      setErrors(newErrors);
      return;
    }

    try {
      if (postData.content) {
        console.log("posdata", postData);
        await postService.addPost(postData); // Call the API with formData including the file
        setSuccessMessage("User registered successfully!"); // Set the success message
        setShowSuccess(true); // Show the success message

        // Clear form data
        setPostData({
          ...postData,
          content: "",
          photo: null,
        });

        // Reset the file input
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }

        setErrors({});
        setTimeout(() => {
          handleCloseSuccess();
        }, 3000);
      }
    } catch (error) {
      setErrors({ general: "Error in posting" });
    }
  };

  // Close the success message
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex space-x-3">
          <div className="flex justify-center items-center">
            <img
              src={`data:image/png;base64,${postUser?.image.fileData}`}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <input
            type="text"
            name="content"
            value={postData.content}
            onChange={handleChange}
            placeholder="What's on your mind?"
            className="flex-1 p-2 h-20 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
          type="file"
          accept="image/*"
          id="icon-button-file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="icon-button-file" className="flex mt-2 ml-10">
        <p className="flex text-gray-500 text-sm">
          <svg
            className="w-5 h-5 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
            />
          </svg> Upload Image </p>
        </label>
        {/* Submit button */}
        <div>
        <button
            onClick={handleSubmit}
            className="absolute right-0 -mt-4 w-20 h-6 text-white bg-violet-500 rounded-xl"
          >
            Post
          </button>
          </div></div>
          </div>
      </div>
  );
};

export default NewPost;
