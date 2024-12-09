import React, { useEffect, useState } from 'react'
import { CommentModel, LikeModel } from '../../api_service/post'
import { Dropdown, Modal } from 'flowbite-react'
import ConfirmationModal from '../../utility/ConfirmationModal'
import EditComment from './EditComment'
import { toast } from 'react-toastify'
import { CommentData } from './CommentList'
import * as postService from "../../api_service/post";
import * as userService from "../../api_service/user";

const CommentItem = ({comment, currentUserId, onDelete, onLoading} :{comment: CommentModel, currentUserId: number, onDelete: any, onLoading:any}) => {
    
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment)
  const [likes, setLikes] = useState<LikeModel[]>([]);
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  useEffect(() => {
  
    //get the likes info of comment
    postService
      .getLikesOfCommentById(+comment.id)
      .then((response) => {
        setLikes(response.data);
        const currentLikes: LikeModel[] = response.data;
        const likeIndex = currentLikes.findIndex(
          (like) => +like.userId === +currentUserId
        );
        if (likeIndex !== -1) {
          setIsLikedByUser(true);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [currentComment]);

  const handleEditComment = (commentData: CommentData) => {
    postService
      .editComment(+comment.id, commentData.content)
      .then(() => {
        setCurrentComment(
         {...currentComment, content: commentData.content}   
        )
        setOpenEditModal(false);
        setTimeout(() => {
            toast.success('Comment successfully edited!', {
              position: 'top-right', 
              autoClose: 5000,
            });
          }, 100);
      })
      .catch((error) => {
        console.log("Error", error);
        toast.error('Error in editing comment!', {
          position: 'top-right', 
          autoClose: 3000,
        });
      });
  };

  const handleClose = () => {
    setOpenEditModal(false);
  };

  const handleToProfile = (userId: number) => {
    userService
      .getUserByUserId(+userId)
      .then((response) => {
        let userName = response.data.username;
        window.open(`/profile/${userName}`);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleLike = () => {
    postService
      .unlikeOrLikeComment(+currentUserId, +comment.id)
      .then((response) => {
        if (isLikedByUser) {
          const newLikeList = likes.filter((like) => +like.userId !== +currentUserId);
          setLikes(newLikeList);
        } else {
          const newLike: LikeModel = {
            userId: +currentUserId,
            commentId: +comment.id,
            liked: true,
          };

          const newLikeList = [...likes, newLike];
          setLikes(newLikeList);
        }

        setIsLikedByUser(!isLikedByUser);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleDelete = () => {
    onLoading()
    postService
      .deleteComment(+comment.id, +comment.postId)
      .then(() => {
        onDelete(+comment.id)
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <div>
    <article className="mt-5 p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold hover:text-blue-800" onClick={() => handleToProfile(currentComment.userId)}>
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`data:image/png;base64,${currentComment.photo.fileData}`}
                        alt={currentComment.name}
                      />
                        {currentComment.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(currentComment.datePosted)
                        .toLocaleString("en-PH")
                        .replace(",", "")}
                    </p>
                  </div>
                  {+currentUserId === +currentComment.userId && (
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
                        <Dropdown.Item onClick={() => setOpenDeleteModal(true)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
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
                      userId: currentComment.userId,
                      postId: currentComment.postId,
                      content: currentComment.content,
                    }}
                    onEdit={handleEditComment}
                    commentId={currentComment.id}
                    onClose={handleClose}
                  />
                </Modal.Body>
              </Modal>

                    </div>
                  )}

                  <ConfirmationModal
                    isVisible={showDeleteModal}
                    message="Are you sure you want to delete the comment?"
                    onConfirm={() =>
                      handleDelete()
                    }
                    onCancel={() => setOpenDeleteModal(false)}
                  />
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {currentComment.content}
                </p>
                <div className="flex items-center mt-4 space-x-4 text-gray-500 text-sm">
                  <button
                    className="flex justify-center items-center gap-2 px-2 hover:bg-blue-50 rounded-full p-1"
                    onClick={() => handleLike()}
                  >
                    <svg
                      className={
                        isLikedByUser
                          ? "w-4 h-4 fill-purple-500"
                          : "w-4 h-4 fill-current"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>
                      {likes.length === 0
                        ? ""
                        : likes.length}
                    </span>
                  </button>
                </div>
              </article>
              <hr className="-mt-2 h-px bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent dark:opacity-100" />
              </div>
  )
}

export default CommentItem