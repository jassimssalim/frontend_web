import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommentModel, LikeModel } from "../../api_service/post";
import * as postService from "../../api_service/post";
import Joi from "joi";
import { toast, ToastContainer } from "react-toastify";
import CommentItem from "./CommentItem";
import Loading from "../../utility/Loading";

export interface CommentData {
  postId: number;
  content: string;
  userId: number;
}

export interface LikeData {
  amount: number;
  isLikedByUser: boolean;
  commentId: number;
}

const CommentList = ({ postId }: { postId: number }) => {
  const userId = localStorage.getItem("userId") || 1;
  const [errors, setErrors] = useState<any>({});
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [commentToAdd, setCommentToAdd] = useState<CommentData>({
    postId: postId,
    content: "",
    userId: +userId,
  });
  const [isDataChange, setIsDataChange] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    //get comments info
    postService.getCommentsByPostId(postId).then((response) => {
      setComments(response.data);
      setIsLoading(false)
    });
  }, [isDataChange]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentToAdd({ ...commentToAdd, [name]: value });
  };

  // Joi validation schema
  const validationSchema = Joi.object({
    content: Joi.string().required().label("Content"),
    postId: Joi.number().allow().label("postId"),
    userId: Joi.number().allow().label("userId"),
  });

  // Handle form submission
  const handleSubmit = async () => {
    const { error } = validationSchema.validate(commentToAdd, {
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

    setIsLoading(true)
    try {
      if (commentToAdd.content) {
        postService.addCommentToPost(commentToAdd).then((response) => {
          const newComment: CommentModel = response.data;
          const newCommentList = [...comments, newComment];
          setComments(newCommentList);
          setIsLoading(false)
          setTimeout(() => {
            toast.success('Comment successfully added!', {
              position: 'top-right', 
              autoClose: 5000,
            });
          }, 100);
        });

        // Clear form data
        setCommentToAdd({
          ...commentToAdd,
          content: "",
        });

        // Reset errors
        setErrors({});
      }
    } catch (error) {
      setErrors({ general: "Error in posting" });
      toast.error('Error in saving comment!', {
        position: 'top-right', 
        autoClose: 3000,
      });
    }
  };

  const handleIsLoading = () => {
    setIsLoading(true)
  }

  const handleDeleteComment = (commentId: number) => {
    setIsDataChange(!isDataChange)  
    setTimeout(() => {
      toast.success('Comment successfully deleted!', {
        position: 'top-right', 
        autoClose: 5000,
      });
    }, 100);
  };

  return (
    <>
    {isLoading? <Loading /> : <div>
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                {`Comments (${comments.length})`}
              </h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <textarea
                id="content"
                name="content"
                className="w-full h-20 p-2 text-sm text-gray-900 bg-white border-1 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                value={commentToAdd.content}
                onChange={(event) => handleChange(event)}
              ></textarea>
              <div className="flex items-center justify-between px-3 py-2 dark:border-gray-600">
                <div></div>
                <div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-purple-900 hover:bg-purple-800"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {comments.map((comment: CommentModel, itemIndex: number) => (
              <div key={itemIndex}>
                <CommentItem comment={comment} onDelete={handleDeleteComment} currentUserId={+userId} onLoading={handleIsLoading} />
              </div>
            ))}
          </div>
        </section>
      </div>}
    </>
  );
};

export default CommentList;
