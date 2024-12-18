import React, { useEffect, useState } from "react";
import * as postService from "../../api_service/post";
import * as userService from "../../api_service/user";
import { UserProfile } from "../../api_service/user";
import Joi from "joi";
import NewPost, { PostData } from "./NewPost";
import { PostModel } from "../../api_service/post";
import { useDarkMode } from "../../utility/ThemeContext";


const EditPost = ({initialPost, onEdit} : {initialPost: PostModel, onEdit: any}) => {
  
  const {userId, content, postImage, ...post} = initialPost
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg border border-gray-200`}>
    <NewPost initialPost = {{userId: userId, content: content, photo: null, isPhotoDeleted:false}} onEdit={onEdit} photoData={postImage}></NewPost>
    </div>
  );
};

export default EditPost;
