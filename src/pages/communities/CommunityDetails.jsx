import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  deleteCommunityById,
} from "../../services/communityService";
import { getPostsByCommunity } from "../../services/postService";
import PostCard from "../../components/posts/PostCard";
import toast from "react-hot-toast";

function CommunityDetails({ user }) {
  const [community, setCommunity] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState("");
  const [postsLoading, setPostsLoading] = useState(true);

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
      setError(err?.response?.data?.message || "Could not load community");
    } finally {
      setLoading(false);
    }
  }

  async function loadCommunityPosts() {
    try {
      setPostsLoading(true);
      setPostsError("");
      setPosts([]);

      const response = await getPostsByCommunity(communityId);
      setPosts(response);
    } catch (err) {
      setPostsError(
        err?.response?.data?.message || "Could not load community posts",
      );
    } finally {
      setPostsLoading(false);
    }
  }

  useEffect(() => {
    loadCommunity();
    loadCommunityPosts();
  }, [communityId]);

  const isMember =
    user && community
      ? community.members.find((member) => member === user._id)
      : false;

  const isOwner = user && community && community.owner === user._id;

  async function handleJoin() {
    try {
      setSubmitting(true);
      setError("");

      const response = await joinCommunity(communityId);
      setCommunity(response);
      toast.success("You joined the community!");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not join community",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleLeave() {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to leave this community?</p>
          <button
            type="button"
            onClick={() => {
              toast.dismiss(t.id);
              confirmLeave();
            }}
          >
            Leave
          </button>
          <button type="button" onClick={() => toast.dismiss(t.id)}>
            Cancel
          </button>
        </div>
      ),
      { id: "confirm-leave-community", duration: Infinity },
    );
  }

  async function confirmLeave() {
    try {
      setSubmitting(true);
      setError("");

      const response = await leaveCommunity(communityId);
      setCommunity(response);
      toast.success("You left the community");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not leave community",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleDelete() {
    toast(
      (t) => (
        <div>
          <p>
            Delete this community and all its posts, comments, votes, and
            bookmarks?
          </p>
          <button
            type="button"
            onClick={() => {
              toast.dismiss(t.id);
              confirmDelete();
            }}
          >
            Delete
          </button>
          <button type="button" onClick={() => toast.dismiss(t.id)}>
            Cancel
          </button>
        </div>
      ),
      { id: "confirm-delete-community", duration: Infinity },
    );
  }

  async function confirmDelete() {
    try {
      setSubmitting(true);
      setError("");

      await deleteCommunityById(communityId);
      toast.success("Community deleted successfully!");
      navigate("/communities");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not delete community",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="threadly-page community-details">
      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : community ? (
        <>
          <h1>r/{community.name}</h1>
          {community.imageUrl && (
            <img
              src={
                new URL(
                  community.imageUrl,
                  import.meta.env.VITE_BACK_END_SERVER_URL,
                ).href
              }
              alt={`${community.name} community`}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          )}
          <p>{community.description}</p>
          <p>Members: {community.members.length}</p>

          {user && isMember && (
            <Link to={`/communities/${communityId}/posts/create`}>
              Create Post
            </Link>
          )}

          {isOwner && (
            <div className="threadly-actions">
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
              <button type="button" onClick={handleLeave} disabled={submitting}>
                {submitting ? "Please wait..." : "Leave Community"}
              </button>
            ) : (
              <button type="button" onClick={handleJoin} disabled={submitting}>
                {submitting ? "Please wait..." : "Join Community"}
              </button>
            )
          ) : (
            <Link to="/sign-in">Sign in to join this community</Link>
          )}

          <h2>Posts</h2>

          {postsError && <p role="alert">{postsError}</p>}

          {postsLoading ? (
            <p>Loading posts...</p>
          ) : (
            <>
              {!postsError && posts.length === 0 && (
                <p>No posts in this community yet.</p>
              )}

              {posts.map((onePost) => (
                <PostCard
                  key={onePost._id}
                  post={onePost}
                  user={user}
                  showCommunity={false}
                />
              ))}
            </>
          )}
        </>
      ) : null}
    </div>
  );
}

export default CommunityDetails;
