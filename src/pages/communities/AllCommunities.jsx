import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllCommunities } from "../../services/communityService";

function AllCommunities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCommunities() {
    try {
      const response = await getAllCommunities();
      setCommunities(response);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not load communities"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommunities();
  }, []);

  return (
    <div>
      <h1>Communities</h1>

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!error && communities.length === 0 && (
            <p>No communities yet.</p>
          )}

          {communities.map((oneCommunity) => (
            <div key={oneCommunity._id}>
              <Link to={`/communities/${oneCommunity._id}`}>
                <h2>r/{oneCommunity.name}</h2>
              </Link>
              <p>{oneCommunity.description}</p>
              <p>Members: {oneCommunity.members.length}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AllCommunities;