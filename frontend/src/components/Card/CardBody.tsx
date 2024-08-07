import { Link as RouterLink } from "react-router-dom";

import { Box, CardContent, Chip, Typography } from "@mui/material";

import PostInterface from "../../interfaces/PostInterface";

interface Props {
  data: PostInterface;
  preventAutoRedirect?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
}

const CardBody: React.FC<Props> = ({ data, preventAutoRedirect }) => {
  return (
    <CardContent
      sx={{ py: 0 }}
      children={
        <Box>
          {data.thread && (
            <Chip
              label={data.thread}
              color="secondary"
              sx={{ mr: 1 }}
              component={RouterLink}
              to={`/thread/${data.post_thread_id}`}
              onClick={(e) => preventAutoRedirect!(e)}
            />
          )}
          {data.cat && <Chip label={data.cat} color="primary" />}
          <Typography variant="h6">{data.title}</Typography>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: data.description }} />
        </Box>
      }
    />
  );
};

export default CardBody;
