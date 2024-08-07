import { useParams } from "react-router-dom";

import { Card, CardContent, Container } from "@mui/material";
import NewComment from "./NewComment";
import CommentInterface from "../../interfaces/CommentInterface";
import CardPostSkelton from "../Card/CardPostSkelton";
import CardCommentSkelton from "../Card/CardCommentSkelton";
import CardPost from "./CardPost";
import CardComment from "./CardComment";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetPostQuery } from "../../redux/api/apiSlice";
import { useGetCommentsQuery } from "../../redux/api/commentSlice";

const Post = () => {
  const { post_id } = useParams();

  const auth = useSelector((state: RootState) => state.authentication);

  const { data: postData } = useGetPostQuery(post_id!);
  const { data: commentData } = useGetCommentsQuery(post_id!);

  return (
    <Container>
      {postData ? <CardPost data={postData} userID={auth.userID} key={postData.id} /> : <CardPostSkelton key={1} />}

      {auth && <NewComment post_id={Number(post_id)} />}

      {commentData === undefined
        ? [1, 2, 3, 4].map((key) => {
            return <CardCommentSkelton key={key} />;
          })
        : commentData.map((x: CommentInterface) => {
            return <CardComment data={x} userID={auth.userID} key={x.id} />;
          })}

      {commentData?.length === 0 && (
        <Card sx={{ mt: 2, mb: 2, ml: 3 }}>
          <CardContent>No comments at the moment!</CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Post;
