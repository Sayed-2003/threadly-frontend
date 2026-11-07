
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from "../../services/commentService";

function CommentsSection({ postId, user, communityId }) {
  const [comments, setComments] = useState([]);
  const [community, setCommunity] = useState(null);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");
        setComments([]);
        setCommunity(null);

        const [commentsResponse, communityResponse] =
          await Promise.all([
            getCommentsByPost(postId),
            import("../../services/communityService").then(
              (module) => module.getCommunityById(communityId)
            ),
          ]);

        if (active) {
          setComments(commentsResponse);
          setCommunity(communityResponse);
        }
      } catch (err) {
        if (active) {
          setError(
            err?.response?.data?.message ||
              "Could not load comments"
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (postId && communityId) {
      loadData();
    }

    return () => {
      active = false;
    };
  }, [postId, communityId]);

  const isMember = Boolean(
    user &&
      community?.members?.some(
        (member) =>
          String(member?._id || member) === String(user._id)
      )
  );

  const canComment = Boolean(user && isMember);

  async function refreshComments() {
    const response = await getCommentsByPost(postId);
    setComments(response);
  }

  async function handleCreate(event) {
    event.preventDefault();

    if (!canComment || !text.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      await createComment(postId, {
        text: text.trim(),
      });

      setText("");
      await refreshComments();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Could not create comment"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReply(event, parentCommentId) {
    event.preventDefault();

    if (!canComment || !replyText.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      await createComment(postId, {
        text: replyText.trim(),
        parentComment: parentCommentId,
      });

      setReplyTo(null);
      setReplyText("");
      await refreshComments();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Could not reply to comment"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit(event, commentId) {
    event.preventDefault();

    if (!canComment || !editText.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      await updateComment(
        postId,
        commentId,
        editText.trim()
      );

      setEditingId(null);
      setEditText("");
      await refreshComments();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Could not update comment"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(commentId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      setSubmitting(true);
      setError("");

      await deleteComment(postId, commentId);
      await refreshComments();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Could not delete comment"
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Build nested replies using parentComment.
  const commentMap = new Map();

  comments.forEach((comment) => {
    commentMap.set(comment._id, {
      ...comment,
      replies: [],
    });
  });

  const rootComments = [];

  comments.forEach((comment) => {
    const current = commentMap.get(comment._id);

    const parentId =
      typeof comment.parentComment === "object"
        ? comment.parentComment?._id
        : comment.parentComment;

    if (parentId && commentMap.has(parentId)) {
      commentMap.get(parentId).replies.push(current);
    } else {
      rootComments.push(current);
    }
  });

  function renderComment(comment, depth = 0) {
    const isAuthor =
      user &&
      String(comment.author?._id || comment.author) ===
        String(user._id);

    return (
      <div
        key={comment._id}
        style={{
          marginLeft: depth > 0 ? "16px" : "0",
          paddingLeft: depth > 0 ? "12px" : "0",
          borderLeft:
            depth > 0 ? "2px solid #343a40" : "none",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            padding: "12px",
            background: "#1a1d20",
            borderRadius: "10px",
            color: "#e8e8e8",
          }}
        >
          <p>
            <strong>
              u/{comment.author?.username || "Unknown user"}
            </strong>
          </p>

          {editingId === comment._id ? (
            <form
              onSubmit={(event) =>
                handleEdit(event, comment._id)
              }
            >
              <textarea
                value={editText}
                onChange={(event) =>
                  setEditText(event.target.value)
                }
                maxLength={1000}
                required
              />

              <button
                type="submit"
                disabled={submitting || !editText.trim()}
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setEditingId(null)}
                disabled={submitting}
              >
                Cancel
              </button>
            </form>
          ) : (
            <p style={{ whiteSpace: "pre-wrap" }}>
              {comment.text}
            </p>
          )}

          {canComment && (
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setReplyTo(comment._id);
                  setReplyText("");
                }}
              >
                Reply
              </button>

              {isAuthor && (
                <>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      setEditingId(comment._id);
                      setEditText(comment.text);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() =>
                      handleDelete(comment._id)
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}

          {replyTo === comment._id && canComment && (
            <form
              onSubmit={(event) =>
                handleReply(event, comment._id)
              }
            >
              <textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={(event) =>
                  setReplyText(event.target.value)
                }
                maxLength={1000}
                required
              />

              <button
                type="submit"
                disabled={submitting || !replyText.trim()}
              >
                Reply
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setReplyTo(null);
                  setReplyText("");
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {comment.replies.map((reply) =>
          renderComment(reply, depth + 1)
        )}
      </div>
    );
  }

  return (
    <section style={{ marginTop: "32px" }}>
      <h2>Comments</h2>

      {error && <p role="alert">{error}</p>}

      {!user && (
        <p>
          <Link to="/sign-in">Sign in</Link> to comment.
        </p>
      )}

      {user && community && !isMember && (
        <p>
          You must{" "}
          <Link to={`/communities/${communityId}`}>
            join this community
          </Link>{" "}
          to comment or reply.
        </p>
      )}

      {canComment && (
        <form onSubmit={handleCreate}>
          <textarea
            placeholder="Add a comment..."
            value={text}
            onChange={(event) =>
              setText(event.target.value)
            }
            maxLength={1000}
            required
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px",
              boxSizing: "border-box",
              background: "#272d30",
              color: "white",
              border: "1px solid #444",
              borderRadius: "10px",
            }}
          />

          <button
            type="submit"
            disabled={submitting || !text.trim()}
          >
            {submitting ? "Posting..." : "Comment"}
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          {comments.length === 0 && !error && (
            <p>No comments yet. Be the first to comment!</p>
          )}

          {rootComments.map((comment) =>
            renderComment(comment)
          )}
        </>
      )}
    </section>
  );
}

export default CommentsSection;
