import { useRef, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

import ThreadInterface from "../../interfaces/ThreadInterface";

import { useAddNewThreadMutation } from "../../redux/api/postThreadsSlice";

interface Props {
  threads: ThreadInterface[] | undefined;
  thread: string;
  setThread: React.Dispatch<React.SetStateAction<string>>;
}

const NewThread: React.FC<Props> = ({ threads, thread, setThread }) => {
  const [open, setOpen] = useState<boolean>(false);
  const thread_title = useRef<HTMLInputElement>(null);
  const thread_description = useRef<HTMLInputElement>(null);

  const [addNewThread] = useAddNewThreadMutation();

  const handleThreadChange = (event: SelectChangeEvent) => {
    setThread(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogSubmit = async () => {
    try {
      const title = thread_title.current?.value || "";
      if (title.trim().length === 0) {
        return toast.error("Thread name cannot be empty!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      await addNewThread({
        title,
        description: thread_description.current?.value,
      }).unwrap();
      handleDialogClose();
    } catch {
      toast.error("Error creating thread name!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <FormControl sx={{ minWidth: 200, mt: 1, mb: 1 }} size="small">
      <InputLabel id="select-tag">Thread *</InputLabel>
      <Select labelId="select-thread" value={thread} label="Thread *" onChange={handleThreadChange} required={true}>
        {threads?.map((x) => (
          <MenuItem value={String(x.id)} key={String(x.id)}>
            {String(x.title)}
          </MenuItem>
        ))}
      </Select>

      <Button type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleDialogOpen}>
        Edit Thread
      </Button>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Create New Thread</DialogTitle>
        <DialogContent>
          <DialogContentText>None of the threads suit you? Create your own one then!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="thread"
            inputRef={thread_title}
            label="Thread Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            inputRef={thread_description}
            name="thread_description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button type="button" onClick={handleDialogSubmit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
};

export default NewThread;
