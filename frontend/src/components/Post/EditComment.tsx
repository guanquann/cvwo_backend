import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Editor from "../Editor/Editor";

import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useGetCommentQuery, useEditCommentMutation } from "../../redux/api/commentSlice";

const EditComment: React.FC = () => {
  const navigate = useNavigate();
  const { post_id, comment_id } = useParams();

  const { data: commentData } = useGetCommentQuery({ postId: post_id!, commentId: comment_id! });
  const [updateComment] = useEditCommentMutation();

  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (commentData !== undefined) {
      setDescription(commentData.description);
    }
  }, [commentData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateComment({ post_id, id: comment_id, description }).unwrap();
      toast.success("Comment updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate(`/post/${post_id}`);
    } catch {
      toast.error("Failed to updated comment!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Update Comment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Editor description={description} setDescription={setDescription} />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm
        </Button>
      </form>
    </Container>
  );
};

export default EditComment;
