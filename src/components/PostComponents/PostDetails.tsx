import React, { useEffect, useState } from "react";
import NavBar from "../../utility/NavBar";
import PostItem from "./PostItem";
import { useNavigate, useParams } from "react-router-dom";
import { PostModel } from "../../api_service/post";
import * as postService from "../../api_service/post";
import CommentList from "../CommentComponents/CommentList";
import { FaArrowLeft} from "react-icons/fa";
import { toast } from "react-toastify";

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
        setTimeout(() => {
          toast.success('Post successfully deleted!', {
            position: 'top-right', 
            autoClose: 3000,
          });
        }, 100);
      })
      .catch((error) => {
        console.log("Error", error);
        toast.error('Error in deleting post!', {
          position: 'top-right', // Use string value for position
          autoClose: 3000,
        });
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
      {/* Back to Home Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-violet-800 hover:bg-blue-600 p-5 rounded-full shadow-lg transform hover:scale-100 transition-all"
        >
          <FaArrowLeft className="text-4xl" />
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-white bg-black rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
          Back
        </div>
      </div>

    </div>
  );
};

export default PostDetails;
