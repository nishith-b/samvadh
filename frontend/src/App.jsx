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

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/signup" exact element={<SignUpForm />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/create-poll" exact element={<CreatePoll />} />
          <Route path="/my-poll" exact element={<MyPolls />} />
          <Route path="/voted-poll" exact element={<VotedPolls />} />
          <Route path="/bookmarked-polls" exact element={<Bookmarks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

//Define the Root component to handle the intial redirect
const Root = () => {
  //Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
