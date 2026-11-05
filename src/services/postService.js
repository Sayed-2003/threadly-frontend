import api from "./api";

export async function getAllPosts() {
  const response = await api.get("/posts");
  return response.data;
}

export async function getPostsByCommunity(communityId) {
  const response = await api.get(`/posts/community/${communityId}`);
  return response.data;
}

export async function getPostById(postId) {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
}

export async function createNewPost(newPost) {
  const response = await api.post("/posts", newPost);
  return response.data;
}

export async function updatePostById(postId, updatedPost) {
  const response = await api.put(`/posts/${postId}`, updatedPost);
  return response.data;
}

export async function deletePostById(postId) {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
}