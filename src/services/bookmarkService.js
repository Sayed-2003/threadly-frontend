import api from "./api";

export async function getBookmarks() {
  const response = await api.get("/bookmarks");
  return response.data;
}

export async function addBookmark(postId) {
  const response = await api.post(`/bookmarks/${postId}`);
  return response.data;
}

export async function removeBookmark(postId) {
  const response = await api.delete(`/bookmarks/${postId}`);
  return response.data;
}

export function getBookmarkErrorMessage(err) {
  if (!err?.response) {
    return "Network error. Please check your connection and try again.";
  }

  const status = err.response.status;

  if (status === 400) return "This post link is not valid.";
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You are not allowed to do that.";
  if (status === 404) return "This post could not be found.";
  if (status === 409) return "This post is already saved.";

  return err.response.data?.message || "Something went wrong. Please try again.";
}
