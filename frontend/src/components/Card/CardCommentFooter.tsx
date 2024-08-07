import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { CardActions, IconButton, Typography } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

import CardDialog from "./CardDialog";
import CommentInterface from "../../interfaces/CommentInterface";

interface Props {
  data: CommentInterface;
  userID: number | null;
  del: () => void;
  preventAutoRedirect: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
}

const CardCommentFooter: React.FC<Props> = ({ data, userID, del, preventAutoRedirect }) => {
  const [open, setOpen] = useState(false);

  const popOut = () => {
    setOpen(true);
  };

  return (
    <CardActions>
      {userID === data.user_id && (
        <>
          <CardDialog del={del} open={open} setOpen={setOpen} text={"comment"} />

          <IconButton
            size="small"
            aria-label="edit"
            color="inherit"
            component={RouterLink}
            to={`/post/${data.post_id}/comment/${data.id}/edit`}
            onClick={(e) => preventAutoRedirect(e)}
          >
            <EditOutlined fontSize="inherit" />
            <Typography variant="body2">Edit</Typography>
          </IconButton>
          <IconButton
            size="small"
            aria-label="edit"
            color="inherit"
            onClick={(e) => {
              preventAutoRedirect(e);
              popOut();
            }}
          >
            <DeleteOutline fontSize="inherit" />
            <Typography variant="body2">Delete</Typography>
          </IconButton>
        </>
      )}
    </CardActions>
  );
};

export default CardCommentFooter;
