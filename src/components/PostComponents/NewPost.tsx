import React, { useEffect, useState } from "react";
import * as postService from "../../api_service/post";
import * as userService from "../../api_service/user";
import { UserProfile } from "../../api_service/user";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../utility/ThemeContext";

export interface PostData {
  userId: number;
  content: string;
  photo: File | null;
  isPhotoDeleted?: boolean;
}

const NewPost = ({
  initialPost,
  onEdit,
  photoData,
  onAdd,
  onLoading,
}: {
  initialPost?: PostData;
  onEdit?: any;
  photoData?: any;
  onAdd?: any;
  onLoading?: any;
}) => {
  const [postUser, setUser] = useState<UserProfile>();
  const username = localStorage.getItem("username");
  const [errors, setErrors] = useState<any>({});
  const [postData, setPostData] = useState<PostData>(
    initialPost ?? {
      userId: 1,
      content: "",
      photo: null,
      isPhotoDeleted: false,
    }
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [photoImage, setPhotoImage] = useState("");
  const [postButtonStyle, setPostButtonStyle] = useState("");
  const [imageData, setImageData] = useState("");
  const [uploadIdHTML, setUploadIdHTML] = useState("icon-button-file");
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    //get user info
    if (username) {
      userService
        .getProfileByUsername(username)
        .then((response) => {
          setUser(response);
          setPostData({ ...postData, userId: response.id });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    setPostButtonStyle("w-20 h-6 text-white bg-violet-500 rounded-xl");

    if (photoData) {
      setImageData(photoData.fileData);
    }
    if (initialPost) {
      setUploadIdHTML("icon-button-for-edit");
    }
    console.log("darkmode", isDarkMode)
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPhotoImage(URL.createObjectURL(file));
    }
    setPostData({ ...postData, photo: file });
    changeStyleWithImage(true);
  };

  const handleRemoveImage = () => {
    setPhotoImage("");
    setPostData({ ...postData, photo: null, isPhotoDeleted: true });
    setImageData("");
    changeStyleWithImage(false);
  };

  // Joi validation schema
  const validationSchema = Joi.object({
    content: Joi.string().required().label("Content"),
    userId: Joi.number().allow().label("UserId"),
    photo: Joi.any().allow().label("Photo"),
    isPhotoDeleted: Joi.boolean().allow().label("IsPhotoDeleted"),
  });

  // Handle form submission
  const handleSubmit = async () => {
    const { error } = validationSchema.validate(postData, {
      abortEarly: false,
    });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return;
    }

    if (initialPost) {
      onEdit(postData);
      return;
    }
    onLoading();
    try {
      if (postData.content) {
        await postService.addPost(postData);
        onAdd();

        // Clear form data
        setPostData({
          ...postData,
          content: "",
          photo: null,
        });
        setPhotoImage("");
        setImageData("");

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

  const changeStyleWithImage = (withPhotoImage: boolean) => {
    if (withPhotoImage) {
      setPostButtonStyle("w-20 h-6 text-white bg-violet-500 rounded-xl");
    } else {
      setPostButtonStyle("w-20 h-6 text-white bg-violet-500 rounded-xl");
    }
  };

  // Close the success message
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

  return (
    <div>
      <div className={`${isDarkMode ? 'bg-black-50' : 'bg-gray-50'} p-4 rounded-lg border border-gray-200`}>
        <div className="flex w-full  space-x-3">
          <div className="flex justify-center items-left h-20">
            <img
              src={`data:image/png;base64,${postUser?.image.fileData}`}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <textarea
            id="content"
            name="content"
            className={`w-full p-2 text-sm ${isDarkMode? "bg-gray-800 text-white placeholder-gray-400" : "text-gray-900 bg-white"} border-1 focus:ring-0`}
            placeholder="What's on your mind?"
            value={postData.content}
            onChange={(event) => handleChange(event)}
          ></textarea>
          {/*
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"> 
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
               <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                   <span className="sr-only">Upload image</span>
               </button>
           </div>
           <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
       </div>
   </div>*/}
        </div>
        <div className="flex items-center justify-center mb-4 mt-2">
          {imageData && (
            <img
              src={`data:image/png;base64,${imageData}`}
              alt="Image Data"
              className="mb-2 w-full h-full max-h-100 max-w-100 object-contain rounded-md"
            />
          )}
          {photoImage && (
            <img
              src={photoImage}
              alt="Post Image"
              className="mb-2 w-full h-full max-h-100 max-w-100 object-contain rounded-md"
            />
          )}
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          {(photoImage || imageData) && (
            <>
              <button
                className="inline-flex justify-center items-center text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={handleRemoveImage}
                id="remove-image-file"
                style={{ display: "none" }}
              ></button>
              <label htmlFor="remove-image-file" className="flex">
                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                  <p className="flex text-gray-500 text-sm">
                    <svg
                      className="w-4 h-5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                    Remove Image
                  </p>
                </div>
              </label>
            </>
          )}
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            type="file"
            accept="image/*"
            id={uploadIdHTML}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {!photoImage && !imageData && (
            <label htmlFor={uploadIdHTML}>
              <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                <p className="flex text-gray-500 text-sm">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </button>
                  Upload Image
                </p>
              </div>
            </label>
          )}
          {/* Submit button */}
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-purple-900 hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
