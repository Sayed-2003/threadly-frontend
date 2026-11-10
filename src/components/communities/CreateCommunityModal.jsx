import { useState } from "react";
import { useNavigate } from "react-router";
import { createNewCommunity } from "../../services/communityService";
import "../../design/community-modal.css";
import toast from "react-hot-toast";

function CreateCommunityModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

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

      const newCommunity = await createNewCommunity(communityData);

      toast.success("Community created successfully!");

      onClose();
      navigate(`/communities/${newCommunity._id}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not create community",
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div
        className="community-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-community-title"
      >
        <h2 id="create-community-title">Create Community</h2>

        {error && <p role="alert">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="community-name">Name:</label>
          <input
            type="text"
            id="community-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="community-description">Description:</label>
          <textarea
            id="community-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            required
          />

          <label htmlFor="community-image">Community photo:</label>
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

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Community"}
          </button>

          <button type="button" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCommunityModal;
