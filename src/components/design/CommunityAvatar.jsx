function CommunityAvatar({ community }) {
  return (
    <span className="community-avatar" aria-hidden="true">
      {community.imageUrl ? (
        <img
          src={
            new URL(
              community.imageUrl,
              import.meta.env.VITE_BACK_END_SERVER_URL,
            ).href
          }
          alt=""
          loading="lazy"
        />
      ) : (
        community.name.charAt(0).toUpperCase()
      )}
    </span>
  );
}

export default CommunityAvatar;
