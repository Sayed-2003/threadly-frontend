import { Link } from "react-router";
import AllCommunities from "./communities/AllCommunities";
import DesignIcon from "../components/design/DesignIcon";
import ConversationArt from "../components/design/ConversationArt";

function Homepage({ user, onCreateCommunity }) {
  return (
    <div className="discovery-page">
      <div className="discovery-intro">
        <p className="eyebrow">Your interests. Your people. Your place.</p>
        <h1>Good conversations start here.</h1>
        <p>Discover communities. Share your perspective. Find your people.</p>
        <DesignIcon className="intro-compass" name="compass" size={30} />
      </div>

      <section className="discovery-hero" aria-labelledby="discovery-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="hero-status-dot" /> A community for every curiosity</p>
          <h2 id="discovery-title">Find your people.<br /><span>Join the conversation.</span></h2>
          <p className="hero-description">From everyday questions to lifelong passions.<br />There’s a conversation here for you.</p>
          <Link className="hero-button" to="/communities">
            Find your community <DesignIcon name="arrow" size={21} />
          </Link>
          <p className="hero-note"><DesignIcon name="heart" size={15} /> Real interests. Real conversations. Really you.</p>
        </div>
        <ConversationArt />
      </section>

      <AllCommunities embedded user={user} onCreateCommunity={onCreateCommunity} />
    </div>
  )
}

export default Homepage
