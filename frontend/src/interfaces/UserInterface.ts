import Post from "./PostInterface";
import Comment from "./CommentInterface";

interface User {
  username: string;
  avatar: string | null;
  posts: Post[];
  comments: Comment[];
  email: string;
}

export default User;
