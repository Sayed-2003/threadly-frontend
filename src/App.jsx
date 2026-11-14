import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import { logout } from "./services/authService";
import AllCommunities from "./pages/communities/AllCommunities";
import CommunityDetails from "./pages/communities/CommunityDetails";
import CreateCommunityModal from "./components/communities/CreateCommunityModal";
import EditCommunity from "./pages/communities/EditCommunity";
import AllPosts from "./pages/posts/AllPosts";
import PostDetails from "./pages/posts/PostDetails";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";
import toast, { Toaster } from "react-hot-toast";
import ThreadlyLayout from "./components/design/ThreadlyLayout";



function App() {
  function getUserFromToken() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
  };


  const [user, setUser] = useState(getUserFromToken());
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);

  function handleLogout() {
    logout();
    setUser(null);
    setShowCreateCommunity(false);
    toast.success("Signed out successfully!");
  }

  return (
    <div className="threadly-app">
     <Toaster position="top-center" toastOptions={{
       className: "threadly-toast",
       success: { iconTheme: { primary: "var(--color-accent)", secondary: "var(--color-on-accent)" } },
     }} />
      <Navbar
        user={user}
        handleLogout={handleLogout}
        onCreateCommunity={() => setShowCreateCommunity(true)}
      />
      {user && showCreateCommunity && (
        <CreateCommunityModal
          onClose={() => setShowCreateCommunity(false)}
        />
      )}
      <ThreadlyLayout user={user} onCreateCommunity={() => setShowCreateCommunity(true)}>
      <Routes>
        <Route path="/" element={<Homepage user={user} onCreateCommunity={() => setShowCreateCommunity(true)} />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route path="/communities" element={<AllCommunities user={user} onCreateCommunity={() => setShowCreateCommunity(true)} />} />
        <Route
          path="/communities/:communityId"
          element={<CommunityDetails user={user} />}
        />
        <Route
          path="/communities/:communityId/edit"
          element={user ? <EditCommunity user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route path="/posts" element={<AllPosts user={user} />} />
        <Route
          path="/posts/:postId"
          element={<PostDetails user={user} />}
        />
        <Route
          path="/communities/:communityId/posts/create"
          element={
            user ? <CreatePost user={user} /> : <Navigate to="/sign-in" />
          }
        />
        <Route
          path="/posts/:postId/edit"
          element={
            user ? <EditPost user={user} /> : <Navigate to="/sign-in" />
          }
        />
        <Route
          path="/bookmarks"
          element={
            user ? <BookmarksPage user={user} /> : <Navigate to="/sign-in" />
          }
        />
      </Routes>
      </ThreadlyLayout>
    </div>
  );
}

export default App;
