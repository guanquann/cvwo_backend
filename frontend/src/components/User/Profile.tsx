import { useParams } from "react-router-dom";
import { useState } from "react";

import CardPost from "../Post/CardPost";
import CommentCard from "../Post/CardComment";
import CardPostSkelton from "../Card/CardPostSkelton";
import { Avatar, Box, Card, CardContent, Container, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import PostInterface from "../../interfaces/PostInterface";
import CommentInterface from "../../interfaces/CommentInterface";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/api/usersSlice";

const Profile: React.FC = () => {
  const auth = useSelector((state: RootState) => state.authentication);

  const { user_id } = useParams();

  const [status, setStatus] = useState<string>("post");

  const { data } = useGetUserQuery(user_id ? Number(user_id) : auth.userID!);

  const filterProfile = (event: React.MouseEvent<HTMLElement>, action: string) => {
    if (action) {
      setStatus(action);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {data ? (
          <>
            <Avatar sx={{ width: 100, height: 100 }} src={data.avatar ? data.avatar : ""} alt={data.username}>
              <Typography variant="h3">{data.avatar === null && data.username[0].toUpperCase()}</Typography>
            </Avatar>
            <Typography variant="h4">{data.username}</Typography>
          </>
        ) : (
          <Avatar sx={{ width: 100, height: 100 }}></Avatar>
        )}
      </Box>

      <ToggleButtonGroup
        value={status}
        onChange={filterProfile}
        size="small"
        aria-label="filter button group"
        sx={{ mt: 2 }}
        exclusive
      >
        <ToggleButton value="post" aria-label="post">
          Post
        </ToggleButton>
        <ToggleButton value="comment" aria-label="comment">
          Comment
        </ToggleButton>
      </ToggleButtonGroup>

      {status === "post" && data?.posts.length === 0 && (
        <Card sx={{ mt: 2, mb: 2, ml: 3 }}>
          <CardContent>User post history is so empty...</CardContent>
        </Card>
      )}

      {status === "comment" && data?.comments.length === 0 && (
        <Card sx={{ mt: 2, mb: 2, ml: 3 }}>
          <CardContent>User comment history is so empty...</CardContent>
        </Card>
      )}

      {!data &&
        [1, 2, 3, 4].map((key) => {
          return <CardPostSkelton key={key} />;
        })}

      {data &&
        status === "post" &&
        data.posts.map((x: PostInterface) => <CardPost data={x} key={x.id} userID={auth.userID} />)}

      {data &&
        status === "comment" &&
        data.comments.map((x: CommentInterface) => <CommentCard data={x} key={x.id} userID={auth.userID} />)}
    </Container>
  );
};

export default Profile;
