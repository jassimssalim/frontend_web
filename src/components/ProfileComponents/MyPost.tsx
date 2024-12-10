import { useEffect, useState } from "react";

import Loading from "../../utility/Loading";
import NewPost from "../PostComponents/NewPost";
import PostList from "../PostComponents/PostList";

import * as postService from "../../api_service/post";
import { PostModel } from "../../api_service/post";
import { toast, ToastContainer } from "react-toastify";

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
    setTimeout(() => {
      toast.success('Post successfully added!', {
        position: 'top-right', 
        autoClose: 5000,
      });
    }, 100);
  };

  const handleDelete = () => {
    setIsDataChange(!isDataChange);
    setTimeout(() => {
      toast.success('Post successfully deleted!', {
        position: 'top-right', 
        autoClose: 5000,
      });
    }, 100);
  };

  const handleLoading = () => {
    setIsLoading(true)
  }

  return (
    <><ToastContainer/>
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
