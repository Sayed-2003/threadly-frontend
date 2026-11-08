import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/postService";
import PostCard from "../../components/posts/PostCard";

function AllPosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPosts() {
    try {
      const response = await getAllPosts();
      setPosts(response);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not load posts"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <h1>Home Feed</h1>

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!error && posts.length === 0 && <p>No posts yet.</p>}

          {posts.map((onePost) => (
            <PostCard key={onePost._id} post={onePost} user={user} />
          ))}
        </>
      )}
    </div>
  );
}

export default AllPosts;