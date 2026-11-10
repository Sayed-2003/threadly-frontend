import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createNewPost } from "../../services/postService";
import { getCommunityById } from "../../services/communityService";
import toast from "react-hot-toast";

function CreatePost({ user }) {
  const [community, setCommunity] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });


  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const { communityId } = useParams();
  const navigate = useNavigate();

  async function loadCommunity() {
    try {
      setLoading(true);
      setError("");
      setCommunity(null);

      const response = await getCommunityById(communityId);
      setCommunity(response);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not load community"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommunity();
  }, [communityId]);

  const isMember =
    user && community
      ? community.members.find((member) => member === user._id)
      : false;

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isMember) {
      setError("Join this community before creating a post");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("text", formData.text);
      postData.append("community", communityId);

      if (image) {
        postData.append("image", image);
      }

      const newPost = await createNewPost(postData);
      toast.success("Post created successfully!");

      navigate(`/posts/${newPost._id}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.err ||
        "Could not create post"
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
      <h1>Create Post</h1>

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : community ? (
        <>
          <h2>r/{community.name}</h2>

          {isMember ? (
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

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected post photo"
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                    borderRadius: "12px",
                  }}
                />
              )}

              <label htmlFor="post-image">Post photo:</label>
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

              <button type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Post"}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/communities/${communityId}`)}
                disabled={submitting}
              >
                Cancel
              </button>
            </form>
          ) : (
            <p>Join this community before creating a post.</p>
          )}
        </>
      ) : null}
    </div>
  );
}

export default CreatePost;
