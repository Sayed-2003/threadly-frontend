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

      await updateCommunityById(communityId, formData);
      
      toast.success("Community changes saved successfully!");
      navigate(`/communities/${communityId}`);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not update community"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const isOwner =
    user && community && community.owner === user._id;

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