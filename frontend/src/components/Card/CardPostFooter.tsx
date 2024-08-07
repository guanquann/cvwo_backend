import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { CardActions, IconButton, Typography } from "@mui/material";

import {
  ChatBubbleOutline,
  DeleteOutline,
  EditOutlined,
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUp,
  ThumbUpOffAlt,
} from "@mui/icons-material";

import CardDialog from "./CardDialog";
import PostInterface from "../../interfaces/PostInterface";

interface Props {
  data: PostInterface;
  userID: number | null;
  upvote: () => void;
  downvote: () => void;
  del: () => void;
  preventAutoRedirect: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
}

const CardPostFooter: React.FC<Props> = ({ data, userID, upvote, downvote, del, preventAutoRedirect }) => {
  const [open, setOpen] = useState(false);

  const popOut = () => {
    setOpen(true);
  };

  return (
    <CardActions>
      <CardDialog del={del} open={open} setOpen={setOpen} text={"post"} />

      <IconButton
        size="small"
        aria-label="upvote"
        color="inherit"
        onClick={(e) => {
          preventAutoRedirect(e);
          upvote();
        }}
        disabled={userID === null}
      >
        {data.is_upvoted === true ? <ThumbUp fontSize="inherit" /> : <ThumbUpOffAlt fontSize="inherit" />}
      </IconButton>

      <Typography variant="body2">{data.vote_count}</Typography>

      <IconButton
        size="small"
        aria-label="downvote"
        color="inherit"
        onClick={(e) => {
          preventAutoRedirect(e);
          downvote();
        }}
        disabled={userID === null}
      >
        {data.is_upvoted === false ? <ThumbDown fontSize="inherit" /> : <ThumbDownOffAlt fontSize="inherit" />}
      </IconButton>

      <IconButton
        size="small"
        aria-label="comment"
        color="inherit"
        component={RouterLink}
        to={`/post/${data.id}`}
        onClick={(e) => preventAutoRedirect(e)}
      >
        <ChatBubbleOutline fontSize="inherit" />
        <Typography variant="body2">{data.comment_count}</Typography>
      </IconButton>

      {userID === data.user_id && (
        <>
          <IconButton
            size="small"
            aria-label="edit"
            color="inherit"
            component={RouterLink}
            to={`/post/${data.id}/edit`}
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

export default CardPostFooter;
