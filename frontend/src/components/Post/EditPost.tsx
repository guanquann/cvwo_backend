import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Editor from "../Editor/Editor";

import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useGetPostQuery, useEditPostMutation } from "../../redux/api/apiSlice";

const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const { post_id } = useParams();

  const { data: post } = useGetPostQuery(post_id as string);
  const [updatePost] = useEditPostMutation();

  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (post !== undefined) {
      setDescription(post.description);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePost({ description, id: post_id });
      toast.success("Post updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate(`/`);
    } catch (err) {
      toast.error("Failed to update post!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Update Post
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

export default EditPost;
