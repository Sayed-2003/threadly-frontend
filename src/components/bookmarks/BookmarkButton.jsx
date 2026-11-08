import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  getBookmarkErrorMessage,
} from "../../services/bookmarkService";

function BookmarkButton({ postId, user, onBookmarkRemoved }) {
  const [isSaved, setIsSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadBookmarkStatus() {
    if (!user) {
      setIsSaved(false);
      return;
    }

    try {
      setError("");

      const bookmarks = await getBookmarks();
      const foundBookmark = bookmarks.find(
        (bookmark) => bookmark.post?._id === postId
      );

      setIsSaved(Boolean(foundBookmark));
    } catch (err) {
      setError(getBookmarkErrorMessage(err));
    }
  }

  useEffect(() => {
    loadBookmarkStatus();
  }, [postId, user]);

  function markAsRemoved() {
    setIsSaved(false);

    if (onBookmarkRemoved) {
      onBookmarkRemoved(postId);
    }
  }

  async function handleClick() {
    if (!user) return;

    const action = isSaved ? "removing" : "adding";

    try {
      setSubmitting(true);
      setError("");

      if (action === "removing") {
        await removeBookmark(postId);
        markAsRemoved();
      } else {
        await addBookmark(postId);
        setIsSaved(true);
      }
    } catch (err) {
      const errorStatus = err?.response?.status;

      if (action === "adding" && errorStatus === 409) {
        setIsSaved(true);
      } else if (action === "removing" && errorStatus === 404) {
        markAsRemoved();
      } else {
        setError(getBookmarkErrorMessage(err));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!user || submitting}
      >
        {submitting ? "Please wait..." : isSaved ? "Saved" : "Save"}
      </button>

      {!user && <Link to="/sign-in">Sign in to save posts</Link>}

      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default BookmarkButton;
