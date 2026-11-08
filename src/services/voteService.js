import api from "./api";

export async function getVotesByPost(postId) {
  const response = await api.get(`/posts/${postId}/votes`);
  return response.data;
}

export async function getMyVote(postId) {
  const response = await api.get(`/posts/${postId}/my-vote`);
  return response.data;
}

export async function votePost(postId, value) {
  const response = await api.put(`/posts/${postId}/vote`, { value });
  return response.data;
}

export async function removeVote(postId) {
  const response = await api.delete(`/posts/${postId}/vote`);
  return response.data;
}
