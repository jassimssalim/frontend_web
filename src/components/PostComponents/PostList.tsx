import React, { useEffect, useState } from "react";
import * as postService from "../../api_service/post";
import { PostModel } from "../../api_service/post";
import PostItem from "./PostItem";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../utility/Loading";
import { useDarkMode } from "../../utility/ThemeContext";
import { toast } from "react-toastify";

const PostList = ({
  allPost,
  onDelete,
  onLoading,
}: {
  allPost: PostModel[];
  onDelete?: any;
  onLoading?: any;
}) => {
  const [posts, setPosts] = useState<PostModel[]>(allPost);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // useEffect(() => {
  //   if (isAllPost) {
  //     postService
  //       .getAllPosts()
  //       .then((response) => {
  //         setPosts(response.data);
  //         setIsLoading(false)
  //       })
  //       .catch((error) => {
  //         console.log("Error", error);
  //       });
  //   } else {
  //     postService
  //       .getPostByUsername(username)
  //       .then((response) => {
  //         setPosts(response.data);
  //         setIsLoading(false)
  //       })
  //       .catch((error) => {
  //         setIsLoading(false)
  //         console.log("Error", error);
  //       });
  //   }
  // }, [isDataChange, dataChange]);

  const handleDelete = (postId: number) => {
    onLoading()
    postService
      .deletePost(+postId)
      .then(() => {
        onDelete();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <>
      {posts.length>0 ? <div>
      {posts.map((post: PostModel, itemIndex: number) => (
        <div key={itemIndex} style={{ marginBottom: "5px" }}>
          <PostItem post={post} onDelete={handleDelete} />
        </div>
      ))} </div>: <div className="text-center text-gray-500 dark:text-gray-400"><h2>No Posts</h2></div>}
    </>
  );
};

export default PostList;
