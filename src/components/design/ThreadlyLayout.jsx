import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { getAllCommunities } from "../../services/communityService";
import DesignIcon from "./DesignIcon";
import CommunityAvatar from "./CommunityAvatar";

function ThreadlyLayout({ children, user, onCreateCommunity }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  async function loadCommunities() {
    try {
      setError("");
      setLoading(true);
      const response = await getAllCommunities();
      setCommunities(response);
    } catch (err) {
      setError(err?.response?.data?.message || "Community list unavailable.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommunities();
  }, [user, location.pathname]);

  const myCommunities = communities.filter((community) =>
    community.members.some((member) => member === user?._id),
  );

  return (
    <div className="threadly-layout">
      <aside className="threadly-sidebar" aria-label="Your little corner">
        <p className="sidebar-label">Your little corner</p>
        <nav className="sidebar-navigation" aria-label="Main navigation">
          <Link className="sidebar-link sidebar-discover" to="/">
            <DesignIcon name="compass" /> Discover
          </Link>
          <Link className="sidebar-link sidebar-feed" to="/posts">
            <DesignIcon name="home" /> Home feed
          </Link>
          <Link className="sidebar-link sidebar-communities" to="/communities">
            <DesignIcon name="users" /> Communities
          </Link>
          <Link className="sidebar-link sidebar-space" to="/dashboard">
            <DesignIcon name="grid" /> Your space
          </Link>
          <Link className="sidebar-link sidebar-saved" to="/bookmarks">
            <DesignIcon name="bookmark" /> Saved posts
          </Link>
        </nav>

        <section className="sidebar-communities-section">
          <div className="sidebar-section-heading">
            <h2 className="sidebar-label">Your communities</h2>
            {user ? (
              <button
                className="icon-button"
                type="button"
                onClick={onCreateCommunity}
                aria-label="Create a community"
              >
                <DesignIcon name="plus" size={19} />
              </button>
            ) : (
              <Link className="icon-button" to="/sign-in" aria-label="Sign in to join communities">
                <DesignIcon name="plus" size={19} />
              </Link>
            )}
          </div>
          {user ? (
            <div className="sidebar-community-list">
              {loading && <p className="sidebar-hint">Finding your corners...</p>}
              {error && <p className="sidebar-hint">{error}</p>}
              {!loading && !error && myCommunities.length === 0 && (
                <p className="sidebar-hint">Your next favorite community is waiting.</p>
              )}
              {myCommunities.map((community) => (
                <Link
                  className="sidebar-community"
                  key={community._id}
                  to={`/communities/${community._id}`}
                >
                  <CommunityAvatar community={community} />
                  <span>r/{community.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="sidebar-hint">Find a few places that feel like you.</p>
          )}
          <Link className="quiet-link" to="/communities">
            Explore communities <DesignIcon name="arrowUp" size={16} />
          </Link>
        </section>

        <div className="sidebar-footer">
          <DesignIcon name="leaf" size={22} />
          <p>A little less scrolling.<br />A little more belonging.</p>
        </div>
      </aside>

      <div id="main-content" className="threadly-main">{children}</div>

      <aside className="threadly-rail" aria-label="Community inspiration">
        <section className="spark-card">
          <DesignIcon name="sprout" size={30} />
          <h2>A spark starts here.</h2>
          <p>That thing you could talk about for hours? There’s a community for it. Or there could be.</p>
          {user ? (
            <button className="button-paper" type="button" onClick={onCreateCommunity}>
              <DesignIcon name="plus" size={19} /> Create a community
            </button>
          ) : (
            <Link className="button-paper" to="/sign-in">
              <DesignIcon name="plus" size={19} /> Create a community
            </Link>
          )}
        </section>

        <section className="growing-section">
          <div className="rail-section-heading">
            <h2>Growing together</h2>
            <DesignIcon name="sprout" size={18} />
          </div>
          <p>A few places to put down roots.</p>
          <div className="growing-list">
            {loading && <p className="rail-hint">Finding your people...</p>}
            {error && <p className="rail-hint">{error}</p>}
            {!loading && !error && communities.length === 0 && (
              <p className="rail-hint">Be the first to plant a little seed.</p>
            )}
            {communities.slice(0, 3).map((community, index) => (
              <Link className="growing-community" key={community._id} to={`/communities/${community._id}`}>
                <span className="community-number">0{index + 1}</span>
                <CommunityAvatar community={community} />
                <span className="growing-community-info">
                  <strong>r/{community.name}</strong>
                  <span>{community.members.length} {community.members.length === 1 ? "member" : "members"}</span>
                </span>
                <DesignIcon name="arrowUp" size={16} />
              </Link>
            ))}
          </div>
          <Link className="quiet-link" to="/communities">
            See all communities <DesignIcon name="arrowUp" size={15} />
          </Link>
        </section>

        <section className="kindness-card">
          <h2><DesignIcon name="message" size={22} /> A good place to be.</h2>
          <p>Be curious. Be thoughtful. Remember there’s a person on the other side of every conversation.</p>
        </section>
        <p className="rail-footer">A little corner of the internet, made for you.</p>
      </aside>
    </div>
  );
}

export default ThreadlyLayout;
