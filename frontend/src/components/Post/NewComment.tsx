import { useState } from "react";

import Editor from "../Editor/Editor";

import { toast } from "react-toastify";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";

import { useAddNewCommentMutation } from "../../redux/api/commentSlice";

interface Props {
  post_id: number;
}

const NewComment: React.FC<Props> = ({ post_id }) => {
  const [description, setDescription] = useState<string>("");

  const [addNewComment] = useAddNewCommentMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (description.length === 0) {
      return toast.error("Comment cannot be empty.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    try {
      await addNewComment({ post_id, description }).unwrap();
      setDescription("");
      toast.success("Comment created successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      toast.error("Failed to create comment!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Card sx={{ ml: 3, mb: 2, mt: 2, p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Editor description={description} setDescription={setDescription} />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm
        </Button>
      </form>
    </Card>
  );
};

export default NewComment;
