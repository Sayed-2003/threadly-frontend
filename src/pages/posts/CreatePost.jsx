import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createNewPost } from "../../services/postService";
import { getCommunityById } from "../../services/communityService";

function CreatePost({ user }) {
  const [community, setCommunity] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

      const newPost = await createNewPost({
        title: formData.title,
        text: formData.text,
        community: communityId,
      });

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