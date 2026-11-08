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
