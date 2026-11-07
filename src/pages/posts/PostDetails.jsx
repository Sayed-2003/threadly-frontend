import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getPostById } from "../../services/postService";

function PostDetails() {
  const [post, setPost] = useState(null);
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { postId } = useParams();

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

          {votes && (
            <div>
              <p>Upvotes: {votes.upvotes}</p>
              <p>Downvotes: {votes.downvotes}</p>
              <p>Score: {votes.score}</p>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default PostDetails;