interface Post {
  id: number;
  title?: string;
  cat?: string;
  thread?: string;
  post_thread_id?: number;
  is_upvoted: boolean | null;
  avatar: string | null;
  description: string;
  created_at: Date;
  updated_at: Date;
  vote_count: number;
  comment_count?: number;
  user_id: number;
  username: string;
}

export default Post;
