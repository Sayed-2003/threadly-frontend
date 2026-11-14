import { Link } from "react-router";
import DesignIcon from "./design/DesignIcon";
import ThemeToggle from "./design/ThemeToggle";

function Navbar({ user, handleLogout, onCreateCommunity }) {
  return (
    <header className="threadly-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="header-inner" aria-label="Account navigation">
      <Link className="threadly-brand" to="/" aria-label="Threadly homepage">
        <span className="brand-mark"><DesignIcon name="message" size={26} /></span>
        <span>threadly<span className="brand-dot">.</span></span>
      </Link>
      <Link className="header-search" to="/communities" aria-label="Browse and search communities">
        <DesignIcon name="search" size={20} />
        <span>A community for every curiosity...</span>
        <span className="search-return" aria-hidden="true">↵</span>
      </Link>
      <div className="header-account">
      <span className="header-motto">Find your people.</span>
      <ThemeToggle />
      <Link className="header-community-link" to="/communities">Communities</Link>

      {user ? (
        <>
          <button className="header-create" type="button" onClick={onCreateCommunity}>
            <DesignIcon name="plus" size={20} />
            <span>Create <span className="create-label-long">Community</span></span>
          </button>
          <details className="account-menu">
            <summary aria-label={`${user.username} account menu`}>
              <span className="user-avatar">{user.username.charAt(0).toUpperCase()}</span>
              <DesignIcon name="chevron" size={15} />
            </summary>
            <div className="account-dropdown">
              <span className="account-name">{user.username}</span>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/bookmarks">Bookmarks</Link>
              <button type="button" onClick={handleLogout}>Sign Out</button>
            </div>
          </details>
        </>
      ) : (
        <>
          <Link className="header-signin" to="/sign-in">Sign In</Link>
          <Link className="header-create" to="/sign-up">Sign Up <DesignIcon name="arrow" size={17} /></Link>
        </>
      )}
      </div>
      </nav>
    </header>
  );
}

export default Navbar;
