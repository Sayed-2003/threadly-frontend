import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCommunityById } from "../../services/communityService";

function CommunityDetails() {
  const [community, setCommunity] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { communityId } = useParams();

  useEffect(() => {
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

    loadCommunity();
  }, [communityId]);

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
        </>
      ) : null}
    </div>
  );
}

export default CommunityDetails;