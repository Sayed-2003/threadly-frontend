
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { getPostById,deletePostById,} from "../../services/postService";
import CommentsSection from "../../components/comments/CommentsSection";
import VoteButtons from "../../components/votes/VoteButtons";
import BookmarkButton from "../../components/bookmarks/BookmarkButton";
import toast from "react-hot-toast";


function PostDetails({ user }) {
  const [post, setPost] = useState(null);
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

      const response = await getPostById(postId);

      setPost(response.post);
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

  function handleDelete() {
  toast(
    (t) => (
      <div>
        <p>Are you sure you want to delete this post?</p>

        <button
          type="button"
          onClick={() => {
            toast.dismiss(t.id);
            confirmDelete();
          }}
        >
          Delete
        </button>

        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </div>
    ),
    {
      id: "confirm-delete-post",
      duration: Infinity,
    }
  );
}

async function confirmDelete() {
  try {
    setDeleting(true);
    setError("");

    await deletePostById(postId);

    toast.success("Post deleted successfully!");
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
    <div className="threadly-page post-details">
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

      {post.imageUrl && (
        <img
          src={new URL(
            post.imageUrl,
            import.meta.env.VITE_BACK_END_SERVER_URL
          ).href}
          alt={`${post.title} photo`}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "500px",
            objectFit: "contain",
            borderRadius: "12px",
            marginTop: "12px",
          }}
        />
      )}

          {isAuthor && (
            <div className="threadly-actions">
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

          <VoteButtons postId={postId} user={user} />

          <BookmarkButton postId={postId} user={user} />

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
