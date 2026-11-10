import { Link } from "react-router";
import VoteButtons from "../votes/VoteButtons";
import BookmarkButton from "../bookmarks/BookmarkButton";

function PostCard({ post, user, showCommunity = true, onBookmarkRemoved }) {
  return (
    <div>
      {showCommunity && post.community && (
        <Link to={`/communities/${post.community._id}`}>
          r/{post.community.name}
        </Link>
      )}

      <p>u/{post.author?.username || "Unknown user"}</p>

      <Link to={`/posts/${post._id}`}>
        <h2>{post.title}</h2>
      </Link>

      <p>{post.text}</p>

      {post.imageUrl && (
        <img
          src={new URL(
            post.imageUrl,
            import.meta.env.VITE_BACK_END_SERVER_URL
          ).href}
          alt={`${post.title} photo`}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "500px",
            objectFit: "contain",
            borderRadius: "12px",
            marginTop: "12px",
          }}
        />
      )}

      <VoteButtons postId={post._id} user={user} />

      <BookmarkButton
        postId={post._id}
        user={user}
        onBookmarkRemoved={onBookmarkRemoved}
      />
    </div>
  );
}

export default PostCard;
