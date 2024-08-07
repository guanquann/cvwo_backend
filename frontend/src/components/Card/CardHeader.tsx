import { Link as RouterLink } from "react-router-dom";

import getTimeAgo from "../../utils/getTimeAgo";
import { Avatar, Box, CardHeader } from "@mui/material";

import PostInterface from "../../interfaces/PostInterface";

interface Props {
  data: PostInterface;
  preventAutoRedirect: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const CardHeader1: React.FC<Props> = ({ data, preventAutoRedirect }) => {
  const date = new Date(data.created_at);
  return (
    <CardHeader
      avatar={
        <Avatar
          onClick={(e) => preventAutoRedirect(e)}
          component={RouterLink}
          to={`/profile/${data.user_id}`}
          src={data.avatar !== null ? data.avatar : ""}
          alt={data.username}
        >
          {data.avatar === null && data.username[0].toUpperCase()}
        </Avatar>
      }
      title={
        <Box
          onClick={(e) => preventAutoRedirect(e)}
          component={RouterLink}
          to={`/profile/${data.user_id}`}
          sx={{ textDecoration: "underline" }}
        >
          {data.username}
        </Box>
      }
      subheader={<Box>{getTimeAgo(date)}</Box>}
    />
  );
};

export default CardHeader1;
