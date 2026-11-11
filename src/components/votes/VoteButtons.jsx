import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getVotesByPost,
  getMyVote,
  votePost,
  removeVote,
} from "../../services/voteService";

function VoteButtons({ postId, user }) {
  const [score, setScore] = useState(0);
  const [userVote, setUserVote] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadVotes() {
    try {
      setError("");

      const votesResponse = await getVotesByPost(postId);
      setScore(votesResponse.score);

      if (user) {
        const myVoteResponse = await getMyVote(postId);
        setUserVote(myVoteResponse.value);
      } else {
        setUserVote(0);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not load votes"
      );
    }
  }

  useEffect(() => {
    loadVotes();
  }, [postId, user]);

  async function handleVote(value) {
    if (!user) return;

    try {
      setSubmitting(true);
      setError("");

      if (userVote === value) {
        await removeVote(postId);
        setUserVote(0);
      } else {
        await votePost(postId, value);
        setUserVote(value);
      }

      const votesResponse = await getVotesByPost(postId);
      setScore(votesResponse.score);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Could not save vote"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="vote-buttons" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        type="button"
        aria-label="Upvote"
        aria-pressed={userVote === 1}
        onClick={() => handleVote(1)}
        disabled={!user || submitting}
        style={{ background: userVote === 1 ? "#ff6b35" : "" }}
      >
        ▲
      </button>

      <span>{score}</span>

      <button
        type="button"
        aria-label="Downvote"
        aria-pressed={userVote === -1}
        onClick={() => handleVote(-1)}
        disabled={!user || submitting}
        style={{ background: userVote === -1 ? "#6b8cff" : "" }}
      >
        ▼
      </button>

      {!user && <Link to="/sign-in">Sign in to vote</Link>}

      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default VoteButtons;
