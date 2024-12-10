import React, { useEffect, useState } from "react";
import { PostModel, CommentModel, LikeModel } from "../../api_service/post";
import * as userService from "../../api_service/user";
import * as postService from "../../api_service/post";
import { Dropdown, Modal, Button } from "flowbite-react";
import NewPost, { PostData } from "./NewPost";
import EditPost from "./EditPost";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../utility/ConfirmationModal";
import Loading from "../../utility/Loading";
import { useDarkMode } from "../../utility/ThemeContext";
import { toast } from "react-toastify";

const PostItem = ({
  post,
  onDelete,
  fromDetails
}: {
  post: PostModel;
  onDelete: any;
  fromDetails?: boolean
}) => {
  const [postUser, setPostUser] = useState({
    id: 1,
    image: { fileName: "", fileData: "" },
    name: "",
    username: "",
  });

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [isEnabledForEditing, setCanBeEdited] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [likes, setLikes] = useState<LikeModel[]>([]);
  const [currentPost, setCurrentPost] = useState(post);
  const navigate = useNavigate();
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const userId = localStorage.getItem("userId") || 1;
  const [isLoading, setIsLoading] =useState(false)
  const [showDeleteModal, setOpenDeleteModal] = useState(false)

  useEffect(() => {
    //get post user info
    userService
      .getUserByUserId(+post.userId)
      .then((response) => {
        setPostUser(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    //get comments info
    postService
      .getCommentsByPostId(+post.id)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    //get the likes info of POST
    postService
      .getLikesOfPostById(+post.id)
      .then((response) => {
        setLikes(response.data);
        const currentLikes: LikeModel[] = response.data;
        const likeIndex = currentLikes.findIndex(
          (like) => +like.userId === +userId
        );
        if (likeIndex !== -1) {
          setIsLikedByUser(true);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [currentPost]);

  const properCase = (name: any) => {
    return (name as string)
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const canBeEditedOrDeleted = () => {
    const username = localStorage.getItem("username");
    if (username) {
      userService.getProfileByUsername(username).then((data) => {
        if (+data.id === +postUser.id) {
          setCanBeEdited(true);
        }
      });
    }

    return isEnabledForEditing;
  };

  const handleEditModal = (toShow: boolean) => {
    setOpenEditModal(toShow);
  };

  const handleEditPost = (postData: PostData) => {
    setIsLoading(true)
    postService
      .updatedPost(postData, +currentPost.id)
      .then((response) => {
        setCurrentPost(response.data);
        setOpenEditModal(false);
        setIsLoading(false)
        setTimeout(() => {
          toast.success('Post successfully edited!', {
            position: 'top-right', 
            autoClose: 5000,
          });
        }, 100);
      })
      .catch((error) => {
        console.log("Error", error);
        toast.error('Error in editing post!', {
          position: 'top-right', // Use string value for position
          autoClose: 3000,
        });
      });
  };

  const handleLike = () => {
    postService
      .unlikeOrLikePost(+userId, +currentPost.id)
      .then((response) => {
        if (isLikedByUser) {
          const newLikeList = likes.filter((like) => +like.userId !== +userId);
          setLikes(newLikeList);
        } else {
          const newLike: LikeModel = {
            userId: +userId,
            postId: +currentPost.id,
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

  return (
    <>
    {isLoading ? <Loading/> :
      <div><div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={`data:image/png;base64,${postUser.image.fileData}`}
              alt={postUser.username}
              className="w-8 h-8 rounded-full"
            />
            <div><Link to={`/profile/${postUser.username}`} target="_blank">
              <p className="text-gray-800 font-semibold hover:text-blue-800">
                {properCase(postUser.name)}{" "}
                <i className="text-gray-500 hover:text-blue-800">@{postUser.username}</i>
              </p></Link>
              <p className="text-gray-500 text-sm">
                {new Date(currentPost.datePosted)
                  .toLocaleString("en-PH")
                  .replace(",", "")}
              </p>
            </div>
          </div>
          {canBeEditedOrDeleted() && (
            <div className="text-gray-500 cursor-pointer">
              {/* <!-- Three-dot menu icon --> */}
              <Dropdown
                label=""
                renderTrigger={() => (
                  <button className="hover:bg-gray-50 rounded-full p-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="7" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="17" r="1" />
                    </svg>
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
            </div>
          )}
        </div>
        {/* <!-- Message --> */}
        <div className="mb-4">
          <p className="text-gray-800">{currentPost.content}</p>
        </div>
        {/* <!-- Image --> */}
        {currentPost.postImage.fileData !== "" && (
          <div className="mb-4 flex items-center justify-center">
            <img
              src={`data:image/png;base64,${currentPost.postImage.fileData}`}
              alt="Post Image"
              className="w-50 h-50 object-contain rounded-md"
            />
          </div>
        )}
        {/* <!-- Like and Comment Section --> */}
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <button
              className="flex justify-center items-center gap-2 px-2 hover:bg-blue-50 rounded-full p-1"
              onClick={() => handleLike()}
            >
              <svg
                className={
                  isLikedByUser
                    ? "w-6 h-6 fill-purple-500"
                    : "w-6 h-6 fill-current"
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likes.length === 0 ? "" : likes.length}</span>
            </button>
          </div>
          {!fromDetails && (
            <button
              className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
              onClick={() => navigate(`/post/details/${currentPost.id}`)}
            >
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                  ></path>
                </g>
              </svg>
              <span>
                {comments.length === 0
                  ? "Comment"
                  : comments.length +
                    (comments.length === 1 ? " Comment" : " Comments")}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* <!-- Edit Modal--> */}
      <Modal
        className="bg-gray-600 bg-opacity-50"
        dismissible
        show={openEditModal}
        onClose={() => setOpenEditModal(false)}
        position="center"
        theme={{
          content: { base: "bg-transparent w-3/4", inner: "bg-transparent" },
        }}
      >
        <Modal.Body>
          <EditPost initialPost={currentPost} onEdit={handleEditPost} />
        </Modal.Body>
      </Modal>
      <ConfirmationModal
        isVisible={showDeleteModal}
        message="Are you sure you want to delete the comment?"
        onConfirm={() => onDelete(+currentPost.id)}
        onCancel={() => setOpenDeleteModal(false)}
        isDarkMode={isDarkMode}  // Pass the dark mode state

      />
      </div>
      }
    </>
  );
};

export default PostItem;
