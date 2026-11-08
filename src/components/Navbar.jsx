import { Link } from "react-router";

function Navbar({ user, handleLogout, onCreateCommunity }) {
  return (
    <nav>
      <Link to="/">threadly</Link>
      <Link to="/communities">Communities</Link>

      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/bookmarks">Bookmarks</Link>

          <button type="button" onClick={onCreateCommunity}>
            Create Community
          </button>

          <span>{user.username}</span>

          <button type="button" onClick={handleLogout}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;