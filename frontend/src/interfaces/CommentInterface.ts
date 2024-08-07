interface Comment {
  id: number;
  created_at: Date;
  updated_at: Date;
  description: string;
  parent_id: number | null;
  post_id: number;
  vote_count: number;
  user_id: number;
  username: string;
  avatar: string | null;
  is_upvoted: boolean | null;
}

export default Comment;
