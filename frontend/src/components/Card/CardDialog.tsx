import { Button, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";

interface Props {
  del: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  text: string;
}

const CardDialog: React.FC<Props> = ({ del, setOpen, open, text }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    del();
    setOpen(false);
  };

  return (
    <Dialog sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }} maxWidth="xs" open={open}>
      <DialogTitle>Delete {text}?</DialogTitle>
      <DialogContent>Are you sure you want to delete your {text}?</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;
