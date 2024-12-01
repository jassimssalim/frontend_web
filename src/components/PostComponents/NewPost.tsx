import { Label, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import * as postService from "../../api_service/post";
import * as userService from "../../api_service/user";
import { UserProfile } from "../../api_service/user";
import Joi from "joi";
import { FormUserData } from "../EntryForms/FormRegister";
import Success from "../../utility/Success";

export interface PostData {
  userId:number
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
    photo: null
  })
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
          setPostData({...postData, userId: response.id})
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }}, [])
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("napasok dito")
    setPostData({ ...postData, [name]: value })};

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
    console.log("editoa")
    const { error } = validationSchema.validate(postData, {
      abortEarly: false,
    });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      console.log("may error", newErrors)
      setErrors(newErrors);
      return;
    }

    try {
      if (postData.content) {
        console.log("posdata", postData)
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
            <div>
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
          <div className="max-w-md">
            <div className="mb-2 block"></div>
          </div>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {/* Submit button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 text-lg font-medium text-white bg-violet-500 rounded-xl"
          >
            Post
          </button>
        </div>

      </div>

  );
};

export default NewPost;
