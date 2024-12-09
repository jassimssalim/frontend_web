import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../main_paths/Login";
import Home from "../main_paths/Home";
import WrongPath from "../main_paths/WrongPath";

import ProtectedRoute from "./ProtectedRoute";

//import from micro components
import Profile from "../components/HomeComponents/Profile";
import PostDetails from "../components/PostComponents/PostDetails";
import OtherUserProfile from "../components/OtherUserComponents/OtherUserProfile";

const Path: React.FC = () => {
  return (
    <Routes>
      {/* Route for Login (Entry) */}
      <Route path="/entry" element={<Login />} />
      {/* Default route */}
      <Route path="/" element={<Login />} />
      {/* Protected route for Home */}
      <Route
        path="/home"
        element={<ProtectedRoute component={Home} />} // Pass Home component directly
      />
      {/*  route for Profile */}
      <Route path="/profile" element={<Profile />} />
      {/*  route for LogOut */}
      <Route path="/logout" element={<Login />} />
      {/* Wrong path  */}
      <Route path="*" element={<WrongPath />} />
      <Route path="/post/details/:postId" element={<PostDetails />} />
      {/* Other User Details  */}
      <Route path="/profile/:userName" element={<OtherUserProfile />} />
    </Routes>
  );
};

export default Path;
