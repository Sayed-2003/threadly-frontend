import DesignIcon from "./DesignIcon";

function ConversationArt() {
  return (
    <div className="conversation-art" aria-hidden="true">
      <div className="conversation-art-backdrop" />
      <div className="conversation-art-orbit" />

      <div className="conversation-art-card">
        <div className="conversation-art-card-top">
          <span className="conversation-art-community">
            <DesignIcon name="users" size={17} />
            YOUR NEXT FAVORITE CORNER
          </span>
          <span className="conversation-art-dots">···</span>
        </div>

        <div className="conversation-art-message">
          Good conversations<br />
          start here<span>.</span>
        </div>
        <div className="conversation-art-line" />
        <div className="conversation-art-line conversation-art-line-short" />

        <div className="conversation-art-card-bottom">
          <div className="conversation-art-avatars">
            <span>J</span>
            <span>A</span>
            <span>K</span>
            <span>+</span>
          </div>
          <span className="conversation-art-replies">
            <DesignIcon name="message" size={15} />
            Join the conversation
          </span>
        </div>
      </div>

      <div className="conversation-art-bubble">
        <DesignIcon name="message" size={23} />
        <span>What’s on<br />your mind?</span>
        <span className="conversation-art-notification" />
      </div>

      <div className="conversation-art-pill">
        <span className="conversation-art-pill-icon">
          <DesignIcon name="heart" size={18} />
        </span>
        <span>Your people are here.</span>
        <DesignIcon name="arrow" size={17} />
      </div>

      <span className="conversation-art-spark">
        <DesignIcon name="bolt" size={24} />
      </span>
      <span className="conversation-art-small-spark">
        <DesignIcon name="plus" size={18} />
      </span>
      <span className="conversation-art-dot" />
    </div>
  );
}

export default ConversationArt;
