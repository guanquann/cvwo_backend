import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import Editor from "../Editor/Editor";

import NewThread from "./NewThread";

import { useAddNewPostMutation } from "../../redux/api/apiSlice";
import { useGetCatsQuery } from "../../redux/api/categorySlice";
import { useGetThreadsQuery } from "../../redux/api/postThreadsSlice";

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const title = useRef<HTMLInputElement>(null);

  const [cat, setCat] = useState<string>("");
  const [thread, setThread] = useState<string>("");
  // const [threads, setThreads] = useState<ThreadInterface[]>();

  const [description, setDescription] = useState<string>("");

  const { data: cats } = useGetCatsQuery();
  const { data: threads } = useGetThreadsQuery();

  const handleChange = (event: SelectChangeEvent) => {
    setCat(event.target.value);
  };

  const [addNewPost] = useAddNewPostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNewPost({
        title: title.current?.value,
        description: description,
        post_thread_id: Number(thread),
        category_id: Number(cat),
      }).unwrap();
      toast.success("Post created successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/");
    } catch {
      toast.error("Failed to create post!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Create new post
      </Typography>
      <form onSubmit={handleSubmit}>
        <NewThread threads={threads} thread={thread} setThread={setThread} />

        <TextField required={true} fullWidth name="title" label="Title" type="text" id="title" inputRef={title} />

        <FormControl sx={{ minWidth: 200, mt: 1, mb: 1 }} size="small">
          <InputLabel id="select-tag">Tag *</InputLabel>
          <Select labelId="select-tag" value={cat} label="Tag *" onChange={handleChange} required={true}>
            {cats?.map((x) => (
              <MenuItem value={String(x.id)} key={String(x.id)}>
                {String(x.cat)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Editor description={description} setDescription={setDescription} />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm
        </Button>
      </form>
    </Container>
  );
};

export default NewPost;
