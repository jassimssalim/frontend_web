import http from "./http";

//post model
export interface PostModel {
  id: number;
  userId: number;
  content: any;
  datePosted?: any;
  postImage: {
    fileName: string;
    fileData: string; // Base64-encoded image data
  };
}

//comment model
export interface CommentModel {
  id: number;
  userId: number;
  name: string;
  photo: {
    fileName: string;
    fileData: string
  }
  datePosted: any;
  content: any;
  postId: number;
}


//like data
export interface LikeModel {
  id?: number;
  userId: number;
  postId?: number;
  commentId?:number;
  liked: boolean
}

export function getAllPosts() {
  return http.get(`/posts`);
}

export function getPostByUsername(username: any) {
  return http.get(`/profiles/${username}/posts`);
}

export function getPostById(id: number) {
  return http.get(`/posts/${id}`);
}

export function getCommentsByPostId(id: number) {
  return http.get(`/posts/${id}/comments`);
}

export function addPost(post: any) {
  //request Param userId, content, photo

  const requestParam = new FormData();
  requestParam.append("userId", post.userId);
  requestParam.append("content", post.content);
  requestParam.append("photo", post.photo as Blob);
  return http.post(`/posts`, requestParam);
}

export function deletePost(id: number) {
  return http.delete(`/posts/delete/${id}`);
}

export function updatedPost(post: any, postId: number) {
  const requestParam = new FormData();
  requestParam.append("userId", post.userId);
  requestParam.append("content", post.content);
  requestParam.append("photo", post.photo as Blob);
  requestParam.append("isPhotoDeleted", post.isPhotoDeleted);

  console.log("requestParam",requestParam)
  return http.put(`/posts/${postId}/edit`, requestParam);

}


export function addCommentToPost(comment: any) {
  //request Param userId, content

  const requestParam = new FormData();
  requestParam.append("userId", comment.userId);
  requestParam.append("content", comment.content);
  return http.post(`/posts/${comment.postId}/comments`, requestParam);
}

export function editComment(commentId:number, content:any) {
  const requestParam = new FormData();
  requestParam.append("content", content);

  return http.put(`/posts/comments/${commentId}/edit`, requestParam);

}

export function deleteComment(commentId:number, postId:number) {
  return http.delete(`/posts/${postId}/comments/${commentId}`);

}


export function getLikesOfCommentById(commentId: number) {
  return http.get(`/likes`, {
    params: {
      commentId: commentId,
      postId: null,
    },
  });
}

export function getLikesOfPostById(postId: number) {
  //request param: commentId OR postId
  return http.get(`/likes`, {
    params: {
      commentId: null,
      postId: postId,
    },
  });
}

export function unlikeOrLikeComment(userId: any, commentId: any) {
  //request param: userId, commentId OR postId
  const requestParam = new FormData();
  requestParam.append("userId", userId);
  requestParam.append("commentId", commentId);

  return http.post(`/likes/add`, requestParam);
}

export function unlikeOrLikePost(userId: any, postId: any) {
  //request param: userId, commentId OR postId
  
  const requestParam = new FormData();
  requestParam.append("userId", userId);
  requestParam.append("postId", postId);

  return http.post(`/likes/add`, requestParam);
}
