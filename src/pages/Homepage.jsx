import { Link } from "react-router";
import AllCommunities from "./communities/AllCommunities";
import DesignIcon from "../components/design/DesignIcon";
import gardenIllustration from "../assets/community-garden.svg";

function Homepage({ user, onCreateCommunity }) {
  return (
    <div className="discovery-page">
      <div className="discovery-intro">
        <p className="eyebrow">A little curiosity goes a long way</p>
        <h1>Discover your kind of people.</h1>
        <p>Big interests. Small discoveries. A place to belong.</p>
        <DesignIcon className="intro-compass" name="compass" size={30} />
      </div>

      <section className="discovery-hero" aria-labelledby="discovery-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="little-seed" /> Good things grow together</p>
          <h2 id="discovery-title">Find your people.<br /><span>Follow your curiosity.</span></h2>
          <p className="hero-description">From everyday questions to lifelong passions.<br />There’s a conversation here for you.</p>
          <Link className="hero-button" to="/communities">
            Find your community <DesignIcon name="arrow" size={21} />
          </Link>
          <p className="hero-note"><DesignIcon name="heart" size={15} /> Real interests. Real conversations. Really you.</p>
        </div>
        <img className="hero-illustration" src={gardenIllustration} alt="" />
      </section>

      <AllCommunities embedded user={user} onCreateCommunity={onCreateCommunity} />
    </div>
  )
}

export default Homepage
