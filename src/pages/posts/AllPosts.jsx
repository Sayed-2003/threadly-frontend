import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllPosts } from "../../services/postService";

function AllPosts() {
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
            <div key={onePost._id}>
              <Link to={`/communities/${onePost.community._id}`}>
                r/{onePost.community.name}
              </Link>

              <p>u/{onePost.author?.username || "Unknown user"}</p>

              <Link to={`/posts/${onePost._id}`}>
                <h2>{onePost.title}</h2>
              </Link>

              <p>{onePost.text}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AllPosts;