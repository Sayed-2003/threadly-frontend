import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  deleteCommunityById,
} from "../../services/communityService";

function CommunityDetails({ user }) {
  const [community, setCommunity] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const isOwner =
    user && community && community.owner === user._id;

  async function handleJoin() {
    try {
      setSubmitting(true);
      setError("");

      const response = await joinCommunity(communityId);
      setCommunity(response);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not join community"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLeave() {
    try {
      setSubmitting(true);
      setError("");

      const response = await leaveCommunity(communityId);
      setCommunity(response);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not leave community"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this community and all its posts, comments, votes, and bookmarks?"
    );

    if (!confirmed) return;

    try {
      setSubmitting(true);
      setError("");

      await deleteCommunityById(communityId);
      navigate("/communities");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not delete community"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : community ? (
        <>
          <h1>r/{community.name}</h1>
          <p>{community.description}</p>
          <p>Members: {community.members.length}</p>

          {isOwner && (
            <div>
              <Link to={`/communities/${communityId}/edit`}>
                Edit Community
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
              >
                Delete Community
              </button>
            </div>
          )}

          {user ? (
            isMember ? (
              <button
                type="button"
                onClick={handleLeave}
                disabled={submitting}
              >
                {submitting ? "Please wait..." : "Leave Community"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleJoin}
                disabled={submitting}
              >
                {submitting ? "Please wait..." : "Join Community"}
              </button>
            )
          ) : (
            <Link to="/sign-in">
              Sign in to join this community
            </Link>
          )}
        </>
      ) : null}
    </div>
  );
}

export default CommunityDetails;