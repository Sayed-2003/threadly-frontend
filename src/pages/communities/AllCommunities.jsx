import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllCommunities } from "../../services/communityService";
import DesignIcon from "../../components/design/DesignIcon";
import CommunityAvatar from "../../components/design/CommunityAvatar";
import CommunityCover from "../../components/design/CommunityCover";

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
          {!embedded && <p>Big passions, little interests. Find a conversation worth joining.</p>}
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
      <span className="directory-search-note"><DesignIcon name="message" size={18} /> Find your people</span>
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
            <Link
              className="community-card"
              key={oneCommunity._id}
              to={`/communities/${oneCommunity._id}`}
              aria-label={`View r/${oneCommunity.name} community`}
            >
              <CommunityCover community={oneCommunity} />
              <div className="community-card-body">
                <div className="community-card-heading">
                  <CommunityAvatar community={oneCommunity} />
                  <h2>r/{oneCommunity.name}</h2>
                </div>
                <p className="community-card-description">{oneCommunity.description}</p>
                <div className="community-card-footer">
                  <p>
                    <DesignIcon name="users" size={16} />
                    {oneCommunity.members.length} {oneCommunity.members.length === 1 ? "member" : "members"}
                  </p>
                  <span className="community-card-open">
                    View community <DesignIcon name="arrow" size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </>
      )}
    </section>
  );
}

export default AllCommunities;
