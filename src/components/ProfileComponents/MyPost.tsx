import { useEffect, useState } from "react";

import Loading from "../../utility/Loading";
import NewPost from "../PostComponents/NewPost";
import PostList from "../PostComponents/PostList";

import * as postService from "../../api_service/post";
import { PostModel } from "../../api_service/post";

const MyPost = () => {
  const username = localStorage.getItem("username");
  const [isDataChange, setIsDataChange] = useState(false);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    postService
      .getPostByUsername(username)
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error", error);
      });
  }, [isDataChange]);

  const handleAdd = () => {
    setIsDataChange(!isDataChange);
  };

  const handleDelete = () => {
    setIsDataChange(!isDataChange);
  };

  const handleLoading = () => {
    setIsLoading(true)
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mb-2">
            <NewPost onAdd={handleAdd} onLoading={handleLoading} />
          </div>
          <div>
            <PostList allPost={posts} onDelete={handleDelete} onLoading={handleLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default MyPost;