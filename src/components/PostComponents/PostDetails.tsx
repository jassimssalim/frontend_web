import React, { useEffect, useState } from "react";
import NavBar from "../../utility/NavBar";
import PostItem from "./PostItem";
import { useNavigate, useParams } from "react-router-dom";
import { PostModel } from "../../api_service/post";
import * as postService from "../../api_service/post";
import CommentList from "../CommentComponents/CommentList";
import { useDarkMode } from "../../utility/ThemeContext";

const PostDetails = () => {
  const param = useParams();
  const postId = param.postId || 1;
  const [post, setPost] = useState<PostModel>({
    id: 1,
    userId: 1,
    content: "",
    postImage: {
      fileName: "",
      fileData: "", // Base64-encoded image data
    },
  });
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    window.scrollTo(0, 0);
    postService
      .getPostById(+postId)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const handleDelete = (postId: number) => {
    postService
      .deletePost(+postId)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <NavBar />
      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex space-x-6">
        {/* Left Side: Profile Info */}
        <aside className="w-1/4 bg-transparent p-6 space-y-6"></aside>

        {/* Middle: Posts Section */}
        <section className="w-1/2 bg-white rounded-lg shadow-md p-6 space-y-6">
          {post.content && (
            <div>
              <PostItem
                post={post}
                onDelete={handleDelete}
                fromDetails={true}
              />
              <CommentList postId={post.id}></CommentList>
            </div>
          )}
        </section>

        {/* Right Side: Suggestions */}
        <aside className="w-1/4 bg-transparent p-6 space-y-6"></aside>
      </main>
    </div>
  );
};

export default PostDetails;
