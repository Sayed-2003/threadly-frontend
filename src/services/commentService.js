
import api from "./api";

export async function getCommentsByPost(postId) {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}

export async function createComment(postId, commentData) {
  const response = await api.post(
    `/posts/${postId}/comments`,
    commentData
  );
  return response.data;
}

export async function updateComment(postId, commentId, text) {
  const response = await api.put(
    `/posts/${postId}/comments/${commentId}`,
    { text }
  );
  return response.data;
}

export async function deleteComment(postId, commentId) {
  const response = await api.delete(
    `/posts/${postId}/comments/${commentId}`
  );
  return response.data;
}
