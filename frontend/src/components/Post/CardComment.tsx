import { Card } from "@mui/material";

import { toast } from "react-toastify";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";

import CommentInterface from "../../interfaces/CommentInterface";
import CardCommentFooter from "../Card/CardCommentFooter";

import { useDeleteCommentMutation } from "../../redux/api/commentSlice";

interface Props {
  data: CommentInterface;
  userID: number | null;
  key: number;
}

const CommentCard: React.FC<Props> = ({ data, userID }) => {
  const [deleteComment] = useDeleteCommentMutation();

  const preventAutoRedirect = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const del = () => {
    deleteComment({ post_id: data.post_id, id: data.id });
    toast.success("Deleted comment sucessfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <Card sx={{ mt: 2, mb: 2, ml: 3 }}>
      <CardHeader data={data} preventAutoRedirect={preventAutoRedirect} />
      <CardBody data={data} />
      <CardCommentFooter data={data} userID={userID} del={del} preventAutoRedirect={preventAutoRedirect} />
    </Card>
  );
};

export default CommentCard;
