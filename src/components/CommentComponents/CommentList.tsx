import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommentModel, LikeModel } from "../../api_service/post";
import * as postService from "../../api_service/post";
import Joi from "joi";
import { Dropdown, Modal } from "flowbite-react";
import EditPost from "../PostComponents/EditPost";
import EditComment from "./EditComment";
import { flushSync } from "react-dom";
import ConfirmationModal from "../../utility/ConfirmationModal";

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
  const [likes, setLikes] = useState<LikeData[]>([]);
  const [commentsLikedByUser, setCommentsLikedByUser] = useState<number[]>([]);
  const [commentToAdd, setCommentToAdd] = useState<CommentData>({
    postId: postId,
    content: "",
    userId: +userId,
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    //get comments info
    postService.getCommentsByPostId(postId).then((response) => {
      setComments(response.data);
      const commentsFromResponse: CommentModel[] = response.data;
      if (commentsFromResponse) {
        const likesData = getDataOfLikesPerCommentId(
          commentsFromResponse.map((com) => com.id)
        );
      }
    });
  }, []);

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

    try {
      if (commentToAdd.content) {
        postService.addCommentToPost(commentToAdd).then((response) => {
          const newComment: CommentModel = response.data;
          const newCommentList = [...comments, newComment];
          setComments(newCommentList);

          getDataOfLikesPerCommentId([+newComment.id]);
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
    }
  };

  const handleEditComment = (commentData: CommentData, commentId: number) => {
    postService
      .editComment(+commentId, commentData.content)
      .then(() => {
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (+comment.id === +commentId) {
              return { ...comment, content: commentData.content };
            } else return comment;
          })
        );

        setOpenEditModal(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleDeleteComment = (commentId: number, postId: number) => {
    postService
      .deleteComment(+commentId, postId)
      .then(() => {
        const newComments = comments.filter(
          (comment) => +comment.id !== +commentId
        );
        setComments(newComments);
        setOpenDeleteModal(false)
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const getDataOfLikesPerCommentId = (commentIds: number[]) => {
    let newLikeDataListToAdd: LikeData[] = [];

    for (let i = 0; i < commentIds.length; i++) {
      postService
        .getLikesOfCommentById(commentIds[i])
        .then((response) => {
          if (response.data !== null) {
            const newLikeList: LikeModel[] = response.data;
            const likeIndex = newLikeList.findIndex(
              (like) => +like.userId === +userId
            );
            const isLiked = likeIndex === -1 ? false : true;
            const newLikeData: LikeData = {
              amount: newLikeList.length,
              isLikedByUser: isLiked,
              commentId: commentIds[i],
            };
            newLikeDataListToAdd.push(newLikeData);

            if (i === commentIds.length - 1) {
              setLikes([...likes, ...newLikeDataListToAdd]);
            }
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  const getLikesLength = (commentId: number) => {
    const likeData = likes.find((like) => +like.commentId === +commentId);
    return likeData ? likeData.amount : 0;
  };

  const isLikedByUser = (commentId: number) => {
    const likeData = likes.find((like) => +like.commentId === +commentId);
    return likeData ? likeData.isLikedByUser : false;
  };

  const handleLike = (commentId: number) => {
    postService
      .unlikeOrLikeComment(+userId, +commentId)
      .then((response) => {
        console.log("unlike or like comment", response.data);
        const likeData = likes.find((like) => +like.commentId === +commentId);

        if (likeData) {
          const isLiked = likeData.isLikedByUser;
          setLikes((prevLikes) =>
            prevLikes.map((data) => {
              if (+data.commentId === +commentId) {
                return {
                  ...data,
                  isLikedByUser: !isLiked,
                  amount: isLiked ? data.amount - 1 : data.amount + 1,
                };
              } else return data;
            })
          );
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              {`Comments (${comments.length})`}
            </h2>
          </div>
          {/* <!-- Add comment --> */}
          {/* <input
            type="text"
            name="content"
            value={commentToAdd.content}
            onChange={handleChange}
            placeholder="Write a comment..."
            className="p-2 h-20 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800"
          />
          <div className="flex items-center justify-between">
            <div></div>
            <button
              onClick={() => handleSubmit()}
              className="mt-2 w-20 h-6 text-white bg-violet-500 rounded-xl"
            >
              Post
            </button>
          </div> */}
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
              {/* <!-- Edit Modal--> */}
              <Modal
                className="bg-gray-600 bg-opacity-50"
                show={openEditModal}
                onClose={() => setOpenEditModal(false)}
                position="center"
                theme={{
                  content: {
                    base: "bg-transparent w-3/4",
                    inner: "bg-transparent",
                  },
                }}
              >
                <Modal.Body>
                  <EditComment
                    commentData={{
                      userId: comment.userId,
                      postId: comment.postId,
                      content: comment.content,
                    }}
                    onEdit={handleEditComment}
                    commentId={comment.id}
                    onClose={handleClose}
                  />
                </Modal.Body>
              </Modal>

              <article className="mt-5 p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`data:image/png;base64,${comment.photo.fileData}`}
                        alt={comment.name}
                      />
                      {comment.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(comment.datePosted)
                        .toLocaleString("en-PH")
                        .replace(",", "")}
                    </p>
                  </div>
                  {+userId === +comment.userId && (
                    <div className="text-gray-500 cursor-pointer">
                      {/* <!-- Three-dot menu icon --> */}
                      <Dropdown
                        label=""
                        renderTrigger={() => (
                          <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                          </button>
                        )}
                      >
                        <Dropdown.Item onClick={() => setOpenEditModal(true)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setOpenDeleteModal(true)
                          }
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  )}

                  <ConfirmationModal
                    isVisible={showDeleteModal}
                    message="Are you sure you want to delete the comment?"
                    onConfirm={() => handleDeleteComment(comment.id, comment.postId)}
                    onCancel={() => setOpenDeleteModal(false)}
                    isDarkMode={isDarkMode}  // Pass the dark mode state

                  />
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.content}
                </p>
                <div className="flex items-center mt-4 space-x-4 text-gray-500 text-sm">
                  <button
                    className="flex justify-center items-center gap-2 px-2 hover:bg-blue-50 rounded-full p-1"
                    onClick={() => handleLike(+comment.id)}
                  >
                    <svg
                      className={
                        isLikedByUser(comment.id)
                          ? "w-4 h-4 fill-purple-500"
                          : "w-4 h-4 fill-current"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>
                      {getLikesLength(+comment.id) === 0
                        ? ""
                        : getLikesLength(+comment.id)}
                    </span>
                  </button>
                </div>
              </article>
              <hr className="-mt-2 h-px bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:opacity-100" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CommentList;
