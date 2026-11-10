import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getCommunityById,
  updateCommunityById,
} from "../../services/communityService";
import toast from "react-hot-toast";

function EditCommunity({ user }) {
  const [community, setCommunity] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      setFormData({
        name: response.name,
        description: response.description,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load community");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommunity();
  }, [communityId]);

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

      const communityData = new FormData();

      communityData.append("name", formData.name);
      communityData.append("description", formData.description);

      if (image) {
        communityData.append("image", image);
      }

      await updateCommunityById(communityId, communityData);

      toast.success("Community changes saved successfully!");
      navigate(`/communities/${communityId}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not update community",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const isOwner = user && community && community.owner === user._id;

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
      <h1>Edit Community</h1>

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : community ? (
        isOwner ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
              required
            />

            {(imagePreview || community.imageUrl) && (
              <img
                src={
                  imagePreview ||
                  new URL(
                    community.imageUrl,
                    import.meta.env.VITE_BACK_END_SERVER_URL,
                  ).href
                }
                alt={`${community.name} community`}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            )}

            <label htmlFor="community-image">Change community photo:</label>
            <input
              type="file"
              id="community-image"
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
              onClick={() => navigate(`/communities/${communityId}`)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <p>You cannot edit this community.</p>
        )
      ) : null}
    </div>
  );
}

export default EditCommunity;
