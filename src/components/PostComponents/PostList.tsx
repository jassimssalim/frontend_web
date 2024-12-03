import React, { useEffect, useState } from "react";
import * as postService from "../../api_service/post";
import { PostModel } from "../../api_service/post";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";

const PostList = ({ isAllPost }: { isAllPost: boolean }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAllPost) {
      postService
        .getAllPosts()
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } else {
      postService
        .getPostByUsername(username)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }, []);

  const handleDelete = (postId: number) => {
    postService
      .deletePost(+postId)
      .then(() => {setPosts(posts.filter((post) => +post.id !== +postId))
        console.log("posts", posts)
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <>
      {posts.map((post: PostModel, itemIndex: number) => (
        <div key={itemIndex} style={{marginBottom: "5px"}}>
          <PostItem post={post} onDelete ={handleDelete} />
        </div>
      ))}
    </>
  );
};

export default PostList;
