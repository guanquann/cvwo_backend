import Post from "../Post/Post";
import Posts from "../Post/Posts";
import Login from "../User/Login";
import Signup from "../User/SignUp";
import Profile from "../User/Profile";

import Layout from "./Layout";

import { Route, Routes, Navigate } from "react-router-dom";

const PublicRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path="/post/:post_id" element={<Post />} />
        <Route path="/thread/:post_thread" element={<Posts />} />
        <Route path="/profile/:user_id" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};

export default PublicRoute;
