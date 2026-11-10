import { useState, useEffect } from "react";
import PostCard from "../../components/posts/PostCard";
import {
  getBookmarks,
  getBookmarkErrorMessage,
} from "../../services/bookmarkService";

function BookmarksPage({ user }) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSavedPosts() {
    try {
      setLoading(true);
      setError("");

      const bookmarks = await getBookmarks();

      const activeBookmarks = bookmarks.filter(
        (bookmark) => bookmark.post && !bookmark.post.isDeleted
      );

      const posts = activeBookmarks.map((bookmark) => bookmark.post);
      setSavedPosts(posts);
    } catch (err) {
      setError(getBookmarkErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSavedPosts();
  }, []);

  function handleBookmarkRemoved(postId) {
    setSavedPosts((currentPosts) =>
      currentPosts.filter((onePost) => onePost._id !== postId)
    );
  }

  return (
    <div className="threadly-page bookmarks-page">
      <h1>Saved Posts</h1>

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading saved posts...</p>
      ) : (
        <>
          {!error && savedPosts.length === 0 && (
            <p>You have no saved posts yet</p>
          )}

          {savedPosts.map((onePost) => (
            <PostCard
              key={onePost._id}
              post={onePost}
              user={user}
              onBookmarkRemoved={handleBookmarkRemoved}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default BookmarksPage;
