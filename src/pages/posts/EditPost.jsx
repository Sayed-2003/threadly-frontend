import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  getPostById,
  updatePostById,
} from "../../services/postService";

function EditPost({ user }) {
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
      setFormData({
        title: response.post.title,
        text: response.post.text,
      });
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

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await updatePostById(postId, formData);
      toast.success("Post changes saved successfully!");
      navigate(`/posts/${postId}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not update post"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Edit Post</h1>

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        isAuthor ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={150}
              required
            />

            <label htmlFor="text">Text:</label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              maxLength={5000}
              required
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={() => navigate(`/posts/${postId}`)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <p>You cannot edit this post.</p>
        )
      ) : null}
    </div>
  );
}

export default EditPost;
