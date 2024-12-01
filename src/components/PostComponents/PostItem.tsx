import React, { useEffect, useState } from "react";
import { PostModel, CommentModel } from "../../api_service/post";
import * as userService from "../../api_service/user";
import * as postService from "../../api_service/post";
import { Dropdown } from "flowbite-react";

const PostItem = ({ post }: { post: PostModel }) => {
  const [postUser, setUser] = useState({
    id: 1,
    image: { fileName: "", fileData: "" },
    name: "",
    username: "",
  });

  const [comments, setComments] = useState<CommentModel[]>([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    //get user info
    userService
      .getUserByUserId(+post.userId)
      .then((response) => {
        console.log("user data", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    //get comments info
    postService.getCommentsByPostId(+post.id).then((response) => {
      console.log("comments", response.data);
      setComments(response.data);
    });
  }, []);

  const properCase = (name: any) => {
    return (name as string)
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            src={`data:image/png;base64,${postUser.image.fileData}`}
            alt={postUser.username}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">
              {properCase(postUser.name)}{" "}
              <i className="text-gray-500">@{postUser.username}</i>
            </p>
            <p className="text-gray-500 text-sm">Posted 2 hours ago</p>
          </div>
        </div>
        <div className="text-gray-500 cursor-pointer">
          {/* <!-- Three-dot menu icon --> */}

          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <button
                className="hover:bg-gray-50 rounded-full p-1"
              >
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
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      {/* <!-- Message --> */}
      <div className="mb-4">
        <p className="text-gray-800">{post.content}</p>
      </div>
      {/* <!-- Image --> */}
      {post.postImage.fileData !== "" && (
        <div className="mb-4">
          <img
            src={`data:image/png;base64,${post.postImage.fileData}`}
            alt="Post Image"
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      )}
      {/* <!-- Like and Comment Section --> */}
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <svg
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>42 Likes</span>
          </button>
        </div>
        <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
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
      </div>
    </div>
  );
};

export default PostItem;