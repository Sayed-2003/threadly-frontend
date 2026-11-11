function CommunityCover({ community }) {
  return (
    <div className="community-cover" aria-hidden="true">
      {community.imageUrl && (
        <img
          src={
            new URL(
              community.imageUrl,
              import.meta.env.VITE_BACK_END_SERVER_URL,
            ).href
          }
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.classList.add("community-cover-unavailable");
          }}
          onLoad={(event) => {
            event.currentTarget.classList.remove("community-cover-unavailable");
          }}
        />
      )}
    </div>
  );
}

export default CommunityCover;
