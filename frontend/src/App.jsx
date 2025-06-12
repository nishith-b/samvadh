import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import CreatePoll from "./pages/Dashboard/CreatePoll";
import MyPolls from "./pages/Dashboard/MyPolls";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import Home from "./pages/Dashboard/Home";
import UserProvider from "./context/UserContext";

// Define the Root component to handle the initial redirect
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/create-poll" element={<CreatePoll />} />
            <Route path="/my-polls" element={<MyPolls />} />
            <Route path="/voted-polls" element={<VotedPolls />} />
            <Route path="/bookmarked-polls" element={<Bookmarks />} />
            {/* 404 Not Found Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
