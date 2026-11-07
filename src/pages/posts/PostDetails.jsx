
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { getPostById,deletePostById,} from "../../services/postService";
import CommentsSection from "../../components/comments/CommentsSection";

function PostDetails({ user }) {
  const [post, setPost] = useState(null);
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const { postId } = useParams();
  const navigate = useNavigate();

  async function loadPost() {
    try {
      setLoading(true);
      setError("");
      setPost(null);
      setVotes(null);

      const response = await getPostById(postId);

      setPost(response.post);
      setVotes(response.votes);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not load post"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, [postId]);

  const isAuthor =
    user && post && post.author?._id === user._id;

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await deletePostById(postId);
      navigate(`/communities/${post.community._id}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not delete post"
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        <>
          <Link to={`/communities/${post.community._id}`}>
            r/{post.community.name}
          </Link>

          <p>u/{post.author?.username || "Unknown user"}</p>

          <h1>{post.title}</h1>
          <p>{post.text}</p>

          {isAuthor && (
            <div>
              {!deleting && (
                <Link to={`/posts/${postId}/edit`}>
                  Edit Post
                </Link>
              )}

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Post"}
              </button>
            </div>
          )}

          {votes && (
            <div>
              <p>Upvotes: {votes.upvotes}</p>
              <p>Downvotes: {votes.downvotes}</p>
              <p>Score: {votes.score}</p>
            </div>
          )}

          <CommentsSection
            postId={postId}
            user={user}
            communityId={post.community._id}
          />
        </>
      ) : null}
    </div>
  );
}

export default PostDetails;