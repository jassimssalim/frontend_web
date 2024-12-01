import React, { useEffect, useState } from "react";
import * as postService from "../../api_service/post";
import { PostModel } from "../../api_service/post";
import PostItem from "./PostItem";

const PostList = ({ isAllPost }: { isAllPost: boolean }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (isAllPost) {
      postService
        .getAllPosts()
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } else {
      postService
        .getPostByUsername(username)
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }, []);

  return (
    <>
      {posts.map((post: PostModel, itemIndex: number) => (
        <div key={itemIndex} style={{marginBottom: "5px"}}>
          <PostItem post={post} />
        </div>
      ))}
    </>
  );
};

export default PostList;
