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
  content: any;
  postId: number;
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

export function getLikesByCommentOrPostId(id: number) {
  //request param: commentId OR postId
  return http.get(`/likes`);
}

export function unlikeOrLike(id: number) {
  //request param: userId, commentId OR postId
  return http.get(`/likes`);
}
