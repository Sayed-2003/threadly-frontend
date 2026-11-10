import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllCommunities } from "../../services/communityService";
import DesignIcon from "../../components/design/DesignIcon";
import CommunityAvatar from "../../components/design/CommunityAvatar";

function AllCommunities({ embedded = false, user, onCreateCommunity }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadCommunities() {
    try {
      const response = await getAllCommunities();
      setCommunities(response);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load communities");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommunities();
  }, []);

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <section className={embedded ? "community-directory directory-embedded" : "community-directory"}>
      <div className="directory-heading">
        <div>
          <p className="eyebrow">Your next favorite corner</p>
          {embedded ? <h2>There’s a place for that.</h2> : <h1>Communities</h1>}
          {!embedded && <p>Big passions, little interests. Find a place to put down roots.</p>}
        </div>
        {user ? (
          <button className="directory-create" type="button" onClick={onCreateCommunity}>
            <DesignIcon name="plus" size={20} /> Start your own
          </button>
        ) : (
          <Link className="directory-create" to="/sign-in">
            <DesignIcon name="plus" size={20} /> Start your own
          </Link>
        )}
      </div>

      <div className="directory-search-row">
      <div className="directory-search">
      <label className="sr-only" htmlFor="community-search">Search communities</label>
      <DesignIcon name="search" size={21} />
      <input
        id="community-search"
        type="search"
        placeholder="Search communities..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      </div>
      <span className="directory-search-note"><DesignIcon name="sprout" size={18} /> Room to grow</span>
      </div>

      {error && <p className="directory-message directory-error" role="alert">{error}</p>}

      {loading ? (
        <p className="directory-message" role="status">Loading...</p>
      ) : (
        <>
          {!error && communities.length === 0 && <p className="directory-message">No communities yet.</p>}

          {!error && communities.length > 0 && filteredCommunities.length === 0 && (
            <p className="directory-message">No communities match your search.</p>
          )}

          <div className="community-grid">
          {filteredCommunities.map((oneCommunity) => (
            <div className="community-card" key={oneCommunity._id}>
              <Link className="community-card-heading" to={`/communities/${oneCommunity._id}`}>
                <CommunityAvatar community={oneCommunity} />
                <h2>r/{oneCommunity.name}</h2>
              </Link>
              <p className="community-card-description">{oneCommunity.description}</p>
              <div className="community-card-footer">
              <p><DesignIcon name="users" size={16} /> Members: {oneCommunity.members.length}</p>
              <DesignIcon name="arrowUp" size={18} />
              </div>
            </div>
          ))}
          </div>
        </>
      )}
    </section>
  );
}

export default AllCommunities;
