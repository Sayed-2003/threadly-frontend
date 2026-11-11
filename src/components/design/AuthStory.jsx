import DesignIcon from "./DesignIcon";

function AuthStory({ mode = "signup" }) {
  return (
    <aside className="auth-story" aria-label="The Threadly community">
      <div className="auth-story-tag">
        <DesignIcon name="message" size={17} />
        A little more connection
      </div>

      <h2 className="auth-story-title">
        {mode === "signin" ? (
          <>
            Less scrolling.<br />
            <span>More connecting.</span>
          </>
        ) : (
          <>
            Your people.<br />
            Your perspective.<br />
            <span>Your place.</span>
          </>
        )}
      </h2>

      <p className="auth-story-description">
        {mode === "signin"
          ? "Pick up a conversation, explore a new interest, or just see what’s on everyone’s mind."
          : "Big interests, small discoveries, and conversations that feel like you. Make a little room for connection."}
      </p>

      <div className="auth-story-art" aria-hidden="true">
        <div className="auth-art-orbit" />

        <div className="auth-art-card auth-art-question">
          <div className="auth-art-author">
            <span className="auth-art-avatar">A</span>
            <span>A good question</span>
          </div>
          <p>What’s one thing you could talk about for hours?</p>
          <div className="auth-art-card-footer">
            <span className="auth-art-topic">r/your-kind-of-people</span>
            <DesignIcon name="message" size={17} />
          </div>
        </div>

        <div className="auth-art-card auth-art-reply">
          <div className="auth-art-author">
            <span className="auth-art-avatar">J</span>
            <span>A familiar feeling</span>
          </div>
          <p>Okay, I’ve found my people.</p>
          <DesignIcon name="heart" size={19} />
        </div>

        <span className="auth-art-badge">
          <DesignIcon name="bolt" size={16} />
          Good conversations happen here
        </span>
      </div>

      <div className="auth-story-footer">
        <div className="auth-story-avatars" aria-hidden="true">
          <span>A</span>
          <span>J</span>
          <span>K</span>
        </div>
        <p>Different voices.<br />A place for yours.</p>
      </div>
    </aside>
  );
}

export default AuthStory;
