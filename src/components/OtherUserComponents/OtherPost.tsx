import React, { useEffect, useState } from 'react'
import { PostModel } from '../../api_service/post';
import Loading from '../../utility/Loading';
import PostList from '../PostComponents/PostList';
import * as postService from "../../api_service/post";

const OtherPost = ({userName}: {userName:string}) => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      postService
        .getPostByUsername(userName)
        .then((response) => {
          setPosts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Error", error);
        });
    }, []);
  
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="mb-2">
            </div>
            <div>
              <PostList allPost={posts} />
            </div>
          </div>
        )}
      </>
    );
  };

export default OtherPost