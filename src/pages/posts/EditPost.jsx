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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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

      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("text", formData.text);

      if (image) {
        postData.append("image", image);
      }

      await updatePostById(postId, postData);
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

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

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

            {(imagePreview || post.imageUrl) && (
              <img
                src={imagePreview || new URL(
                  post.imageUrl,
                  import.meta.env.VITE_BACK_END_SERVER_URL
                ).href}
                alt={`${post.title} photo`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
            )}

            <label htmlFor="post-image">Change post photo:</label>
            <input
              type="file"
              id="post-image"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              disabled={submitting}
              onChange={(event) => {
                const selectedImage = event.target.files?.[0] || null;

                if (selectedImage && selectedImage.size > 5 * 1024 * 1024) {
                  setError("Image must be 5 MB or smaller");
                  setImage(null);
                  event.target.value = "";
                  return;
                }

                setError("");
                setImage(selectedImage);
              }}
            />
            <p>Leave this empty to keep the current photo.</p>

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
