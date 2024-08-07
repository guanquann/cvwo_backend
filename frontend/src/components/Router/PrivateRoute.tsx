import Post from "../Post/Post";
import Posts from "../Post/Posts";
import NewPost from "../Post/NewPost";
import EditComment from "../Post/EditComment";
import EditPost from "../Post/EditPost";
import Profile from "../User/Profile";
import Settings from "../User/Settings";

import Layout from "./Layout";

import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path="/post/:post_id" element={<Post />} />
        <Route path="/post/:post_id/edit" element={<EditPost />} />
        <Route path="/post/:post_id/comment/:comment_id/edit" element={<EditComment />} />
        <Route path="/thread/:post_thread" element={<Posts />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/profile/:user_id" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Navigate to="/" replace={true} />} />
      <Route path="/signup" element={<Navigate to="/" replace={true} />} />
      <Route path="/new" element={<NewPost />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};

export default PrivateRoute;
